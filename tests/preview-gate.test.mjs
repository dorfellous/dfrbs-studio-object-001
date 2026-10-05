import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import test from 'node:test';
import worker from '../preview/worker.mjs';

const origin = 'https://preview.example.com';
const password = 'test-password-not-a-deployment-secret';
const cookieName = '__Host-dfrbs-preview';

function fixture(overrides = {}) {
  const requests = [];
  const env = {
    PREVIEW_PASSWORD_SHA256: createHash('sha256').update(password).digest('hex'),
    PREVIEW_SESSION_SECRET: 'test-session-key-never-use-in-deployment-1234',
    ASSETS: {
      async fetch(request) {
        requests.push(request);
        return new Response(request.method === 'HEAD' ? null : 'PRIVATE CONTENT', {
          status: request.headers.has('range') ? 206 : 200,
          headers: {
            'Content-Type': 'video/mp4',
            'Cache-Control': 'public, max-age=31536000',
            'Accept-Ranges': 'bytes',
            'Content-Range': 'bytes 0-14/99',
          },
        });
      },
    },
    ...overrides,
  };
  return { env, requests };
}

function loginRequest(value = password, returnTo = '/?page=work', extraHeaders = {}) {
  return new Request(`${origin}/__preview/login`, {
    method: 'POST',
    headers: { Origin: origin, 'Content-Type': 'application/x-www-form-urlencoded', ...extraHeaders },
    body: new URLSearchParams({ password: value, returnTo }),
  });
}

function sessionCookie(response) {
  return response.headers.get('Set-Cookie')?.split(';', 1)[0];
}

function privacyHeaders(response) {
  assert.equal(response.headers.get('Cache-Control'), 'no-store');
  assert.equal(response.headers.get('X-Robots-Tag'), 'noindex, nofollow, noarchive');
}

test('missing or malformed secrets fail closed before any asset access', async () => {
  for (const overrides of [
    { PREVIEW_PASSWORD_SHA256: undefined },
    { PREVIEW_PASSWORD_SHA256: 'not-a-hash' },
    { PREVIEW_SESSION_SECRET: undefined },
    { PREVIEW_SESSION_SECRET: 'weak' },
  ]) {
    const { env, requests } = fixture(overrides);
    for (const path of ['/', '/assets/private.jpg', '/__preview/login']) {
      const response = await worker.fetch(new Request(origin + path), env);
      assert.equal(response.status, 503);
      assert.equal(requests.length, 0);
      privacyHeaders(response);
    }
  }
});

test('anonymous HTML, images, video ranges, scripts and HEAD cannot access assets', async () => {
  const { env, requests } = fixture();
  for (const [path, options] of [
    ['/?project=ran-coastcity', {}],
    ['/assets/private.jpg', {}],
    ['/assets/film.mp4', { headers: { Range: 'bytes=0-14' } }],
    ['/assets/index.js', {}],
    ['/assets/film.mp4', { method: 'HEAD' }],
  ]) {
    const response = await worker.fetch(new Request(origin + path, options), env);
    assert.equal(response.status, 303);
    const location = new URL(response.headers.get('Location'), origin);
    assert.equal(location.origin, origin);
    assert.equal(location.pathname, '/__preview/login');
    assert.equal(location.searchParams.get('returnTo'), path);
    assert.equal(await response.text(), '');
    privacyHeaders(response);
  }
  assert.equal(requests.length, 0);
});

test('login form is self-contained, escaped, and has no private assets', async () => {
  const { env, requests } = fixture();
  const response = await worker.fetch(new Request(`${origin}/__preview/login?returnTo=${encodeURIComponent('/?project=%22%3E%3Cscript%3E')}`), env);
  const html = await response.text();
  assert.equal(response.status, 200);
  assert.match(html, /type="password"/);
  assert.match(html, /method="post"/);
  assert.doesNotMatch(html, /<script|<img|<link|<iframe/i);
  assert.equal(requests.length, 0);
  assert.equal(response.headers.get('Set-Cookie'), null);
  // Native HTML form POST must retain Origin for the login's CSRF check.
  assert.equal(response.headers.get('Referrer-Policy'), 'same-origin');
  privacyHeaders(response);
});

test('incorrect password returns a generic error and creates no session', async () => {
  const { env, requests } = fixture();
  const response = await worker.fetch(loginRequest('wrong-secret'), env);
  const html = await response.text();
  assert.equal(response.status, 401);
  assert.match(html, /Incorrect password/);
  assert.doesNotMatch(html, /wrong-secret|test-password/);
  assert.equal(response.headers.get('Set-Cookie'), null);
  assert.equal(requests.length, 0);
  privacyHeaders(response);
});

test('correct password creates a secure eight-hour cookie and serves authenticated assets', async () => {
  const { env, requests } = fixture();
  const response = await worker.fetch(loginRequest(password, '/?project=ran-coastcity'), env);
  assert.equal(response.status, 303);
  assert.equal(response.headers.get('Location'), '/?project=ran-coastcity');
  const setCookie = response.headers.get('Set-Cookie');
  assert.ok(setCookie.startsWith(`${cookieName}=`));
  for (const attribute of ['Path=/', 'Secure', 'HttpOnly', 'SameSite=Lax', 'Max-Age=28800']) {
    assert.ok(setCookie.includes(attribute), attribute);
  }
  assert.doesNotMatch(setCookie, /Domain=/i);
  privacyHeaders(response);
  const request = new Request(`${origin}/assets/film.mp4?version=2`, {
    headers: { Cookie: sessionCookie(response), Range: 'bytes=0-14' },
  });
  const asset = await worker.fetch(request, env);
  assert.equal(asset.status, 206);
  assert.equal(await asset.text(), 'PRIVATE CONTENT');
  assert.equal(asset.headers.get('Content-Type'), 'video/mp4');
  assert.equal(asset.headers.get('Content-Range'), 'bytes 0-14/99');
  assert.equal(requests.length, 1);
  assert.equal(requests[0], request);
  privacyHeaders(asset);
  const head = await worker.fetch(new Request(`${origin}/assets/film.mp4`, {
    method: 'HEAD', headers: { Cookie: sessionCookie(response) },
  }), env);
  assert.equal(head.status, 200);
  assert.equal(await head.text(), '');
  assert.equal(requests[1].method, 'HEAD');
  privacyHeaders(head);
});

test('tampered, expired and duplicate session cookies cannot retrieve assets', async (t) => {
  const start = Date.now();
  t.mock.method(Date, 'now', () => start);
  const { env, requests } = fixture();
  const response = await worker.fetch(loginRequest(), env);
  const cookie = sessionCookie(response);
  assert.ok(cookie);
  const token = cookie.slice(cookie.indexOf('=') + 1);
  const tampered = token.slice(0, -1) + (token.endsWith('a') ? 'b' : 'a');
  for (const value of [
    `${cookieName}=${tampered}`,
    `${cookieName}=invalid`,
    `${cookie}; ${cookieName}=invalid`,
  ]) {
    const denied = await worker.fetch(new Request(origin + '/assets/private.jpg', { headers: { Cookie: value } }), env);
    assert.equal(denied.status, 303);
  }
  Date.now = () => start + 8 * 60 * 60 * 1000;
  const expired = await worker.fetch(new Request(origin + '/assets/private.jpg', { headers: { Cookie: cookie } }), env);
  assert.equal(expired.status, 303);
  assert.equal(requests.length, 0);
});

test('cross-origin and origin-less login requests do not create sessions', async () => {
  const { env, requests } = fixture();
  for (const maliciousOrigin of ['https://evil.example', 'null', '']) {
    const request = loginRequest(password, '/', { Origin: maliciousOrigin });
    const response = await worker.fetch(request, env);
    assert.equal(response.status, 403);
    assert.equal(response.headers.get('Set-Cookie'), null);
    privacyHeaders(response);
  }
  assert.equal(requests.length, 0);
});

test('login rejects other media types and oversized bodies, including lying content-length', async () => {
  const { env, requests } = fixture();
  const badType = await worker.fetch(loginRequest(password, '/', { 'Content-Type': 'application/json' }), env);
  assert.equal(badType.status, 415);
  for (const length of [undefined, '1', '2049']) {
    const headers = { Origin: origin, 'Content-Type': 'application/x-www-form-urlencoded' };
    if (length) headers['Content-Length'] = length;
    const response = await worker.fetch(new Request(`${origin}/__preview/login`, {
      method: 'POST', headers, body: 'password=' + 'x'.repeat(2050),
    }), env);
    assert.equal(response.status, 413);
    assert.equal(response.headers.get('Set-Cookie'), null);
    privacyHeaders(response);
  }
  assert.equal(requests.length, 0);
});

test('successful login cannot redirect offsite or into the login route', async () => {
  const { env } = fixture();
  for (const returnTo of [
    'https://evil.example/path', '//evil.example/path', '/\\evil.example',
    '/%2fevil.example', '/%5cevil.example', '/__preview/login', '/x\r\nLocation: evil',
    '/x/..//evil.example/path', '/x/%2e%2e//evil.example/path',
  ]) {
    const response = await worker.fetch(loginRequest(password, returnTo), env);
    assert.equal(response.status, 303);
    assert.equal(response.headers.get('Location'), '/');
  }
});

test('unexpected asset failures return a generic no-store response', async () => {
  const { env } = fixture({ ASSETS: { async fetch() { throw new Error('secret internal detail'); } } });
  const response = await worker.fetch(loginRequest(), env);
  const asset = await worker.fetch(new Request(origin + '/', { headers: { Cookie: sessionCookie(response) } }), env);
  assert.equal(asset.status, 503);
  assert.doesNotMatch(await asset.text(), /secret internal detail/);
  privacyHeaders(asset);
});
