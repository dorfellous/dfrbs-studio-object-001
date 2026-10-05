import { Buffer } from 'node:buffer';
import { createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto';

const LOGIN_PATH = '/__preview/login';
const COOKIE_NAME = '__Host-dfrbs-preview';
const SESSION_SECONDS = 8 * 60 * 60;
const MAX_FORM_BYTES = 2048;

function protect(response) {
  const headers = new Headers(response.headers);
  headers.set('Cache-Control', 'no-store');
  headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
  // HTML form POSTs under no-referrer send Origin:null and fail the CSRF check.
  headers.set('Referrer-Policy', 'same-origin');
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('X-Frame-Options', 'DENY');
  // Retain the original stream, status and media/range headers without buffering.
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function textResponse(message, status, headers = {}) {
  return protect(new Response(message, {
    status,
    headers: { 'Content-Type': 'text/plain; charset=utf-8', ...headers },
  }));
}

function redirect(location, cookie) {
  const headers = { Location: location };
  if (cookie) headers['Set-Cookie'] = cookie;
  return protect(new Response(null, { status: 303, headers }));
}

function ready(env) {
  return typeof env?.PREVIEW_PASSWORD_SHA256 === 'string'
    && /^[a-f0-9]{64}$/i.test(env.PREVIEW_PASSWORD_SHA256)
    && typeof env.PREVIEW_SESSION_SECRET === 'string'
    && env.PREVIEW_SESSION_SECRET.length >= 32
    && typeof env.ASSETS?.fetch === 'function';
}

function safeReturnTo(value, origin) {
  if (typeof value !== 'string' || value.length > 1600 || !value.startsWith('/')) return '/';
  try {
    const decoded = decodeURIComponent(value);
    if (value.startsWith('//') || decoded.startsWith('//')
      || /[\\\u0000-\u001f\u007f]/.test(value + decoded)) return '/';
    const target = new URL(value, origin);
    if (target.origin !== origin || target.pathname.startsWith('//') || target.pathname.startsWith('/__preview/')) return '/';
    return target.pathname + target.search;
  } catch {
    return '/';
  }
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]);
}

function loginForm(returnTo, error = false, head = false) {
  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow,noarchive"><title>DFRBS Studio · Private preview</title>
<style>*,*::before,*::after{box-sizing:border-box}body{margin:0;min-height:100svh;display:grid;place-items:center;background:#090909;color:#eeeae3;font-family:Arial,Helvetica,sans-serif;padding:24px}main{width:min(100%,440px);border:1px solid #3b3b3b;padding:clamp(28px,6vw,48px)}.label{font-family:monospace;letter-spacing:.13em;font-size:11px;color:#aaa;margin:0 0 40px}h1{font-size:36px;font-weight:500;letter-spacing:-.045em;line-height:1.05;margin:0 0 18px}p{color:#aaa;font-size:14px;line-height:1.6;margin:0 0 32px}label{display:block;font-size:12px;margin-bottom:10px}input,button{font:inherit;border-radius:0;width:100%;min-height:48px}input{padding:12px;border:1px solid #777;background:#141414;color:#fff}input:focus-visible,button:focus-visible{outline:2px solid #ff5bbc;outline-offset:4px}button{margin-top:16px;background:#eeeae3;color:#111;border:1px solid #eeeae3;cursor:pointer;padding:12px}button:hover{background:#ff5bbc;border-color:#ff5bbc}.error{color:#ff93d0;font-size:13px;margin:14px 0 0}</style></head>
<body><main><div class="label">DFRBS STUDIO / PRIVATE PREVIEW</div><h1>A work in progress.</h1><p>Enter the shared password to view the studio website.</p><form method="post" action="${LOGIN_PATH}"><input type="hidden" name="returnTo" value="${escapeHtml(returnTo)}"><label for="password">Password</label><input id="password" name="password" type="password" required autocomplete="current-password" maxlength="256"${error ? ' aria-invalid="true" aria-describedby="error"' : ''}>${error ? '<p class="error" id="error" role="alert">Incorrect password. Try again.</p>' : ''}<button type="submit">View the studio</button></form></main></body></html>`;
  return protect(new Response(head ? null : html, {
    status: error ? 401 : 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; frame-ancestors 'none'; base-uri 'none'",
    },
  }));
}

function signature(payload, env) {
  // Including the password digest invalidates old sessions after password rotation.
  return createHmac('sha256', env.PREVIEW_SESSION_SECRET)
    .update(payload + '.' + env.PREVIEW_PASSWORD_SHA256.toLowerCase())
    .digest();
}

function issueSession(env) {
  const issued = Math.floor(Date.now() / 1000);
  const expires = issued + SESSION_SECONDS;
  const payload = `v1.${issued}.${expires}.${randomBytes(16).toString('hex')}`;
  const token = `${payload}.${signature(payload, env).toString('hex')}`;
  return `${COOKIE_NAME}=${token}; Path=/; Max-Age=${SESSION_SECONDS}; Secure; HttpOnly; SameSite=Lax`;
}

function authenticated(request, env) {
  const cookies = (request.headers.get('Cookie') || '').split(';')
    .map((part) => part.trim())
    .filter((part) => part.startsWith(COOKIE_NAME + '='));
  if (cookies.length !== 1) return false;
  const token = cookies[0].slice(COOKIE_NAME.length + 1);
  const match = /^v1\.(\d{1,12})\.(\d{1,12})\.([a-f0-9]{32})\.([a-f0-9]{64})$/.exec(token);
  if (!match) return false;
  const issued = Number(match[1]);
  const expires = Number(match[2]);
  const now = Math.floor(Date.now() / 1000);
  if (issued > now + 60 || expires !== issued + SESSION_SECONDS || now >= expires) return false;
  const payload = token.slice(0, token.lastIndexOf('.'));
  return timingSafeEqual(signature(payload, env), Buffer.from(match[4], 'hex'));
}

async function readForm(request) {
  const declaredLength = request.headers.get('Content-Length');
  if (declaredLength !== null && (!/^\d+$/.test(declaredLength) || Number(declaredLength) > MAX_FORM_BYTES)) {
    return { error: 413 };
  }
  if (!request.body) return { form: new URLSearchParams() };
  const reader = request.body.getReader();
  const chunks = [];
  let length = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > MAX_FORM_BYTES) {
        await reader.cancel();
        return { error: 413 };
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const body = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }
  try {
    return { form: new URLSearchParams(new TextDecoder('utf-8', { fatal: true }).decode(body)) };
  } catch {
    return { error: 400 };
  }
}

export default {
  async fetch(request, env) {
    if (!ready(env)) return textResponse('Private preview is temporarily unavailable.', 503);
    try {
      const url = new URL(request.url);
      if (url.pathname === LOGIN_PATH) {
        if (request.method === 'GET' || request.method === 'HEAD') {
          return loginForm(safeReturnTo(url.searchParams.get('returnTo'), url.origin), false, request.method === 'HEAD');
        }
        if (request.method !== 'POST') return textResponse('Method not allowed.', 405, { Allow: 'GET, HEAD, POST' });
        if (request.headers.get('Origin') !== url.origin) return textResponse('Request could not be accepted.', 403);
        const mediaType = (request.headers.get('Content-Type') || '').split(';', 1)[0].trim().toLowerCase();
        if (mediaType !== 'application/x-www-form-urlencoded') return textResponse('Unsupported request format.', 415);
        const parsed = await readForm(request);
        if (parsed.error) return textResponse('Request could not be accepted.', parsed.error);
        const form = parsed.form;
        const returnTo = safeReturnTo(form.getAll('returnTo').length === 1 ? form.get('returnTo') : '/', url.origin);
        const supplied = createHash('sha256').update(form.get('password') || '').digest();
        const expected = Buffer.from(env.PREVIEW_PASSWORD_SHA256, 'hex');
        const passwordMatches = timingSafeEqual(supplied, expected);
        if (!passwordMatches || form.getAll('password').length !== 1) return loginForm(returnTo, true);
        return redirect(returnTo, issueSession(env));
      }
      if (!authenticated(request, env)) {
        const returnTo = safeReturnTo(url.pathname + url.search, url.origin);
        return redirect(`${LOGIN_PATH}?${new URLSearchParams({ returnTo })}`);
      }
      return protect(await env.ASSETS.fetch(request));
    } catch {
      // Fail closed without exposing or logging request bodies, secrets or internals.
      return textResponse('Private preview is temporarily unavailable.', 503);
    }
  },
};
