# Private studio preview

This separate Cloudflare Worker serves the studio behind a shared password. It does not change the public GitHub Pages website. Its configuration always runs the password gate before serving HTML, scripts, images or films; alternate version URLs are disabled.

Preview: https://dfrbs-studio-private-preview.noisy-star-5627.workers.dev

## Build and publish

Run `npm run build:private` and `npm run test:private`, then deploy with `wrangler deploy --config preview/wrangler.jsonc`. The Worker name is `dfrbs-studio-private-preview`. Use the HTTPS address returned by the deployment.

The Worker requires two Cloudflare secrets: `PREVIEW_PASSWORD_SHA256` (the SHA-256 hex digest of a strong shared password) and `PREVIEW_SESSION_SECRET` (a cryptographically random session signing key, at least 32 characters). Provide these through `wrangler secret bulk --config preview/wrangler.jsonc` using stdin, or Cloudflare's secret settings. Never commit either secret, the actual password, or local secret files. With secrets absent, the website responds with 503 and exposes no assets.

Sessions use a signed Secure/HttpOnly/SameSite cookie and expire after eight hours. Rotating either secret invalidates existing sessions. Login and website responses prevent browser caching and search indexing. Share the password separately from the link; anyone with both can view the preview.

The original Sites hosting manifest and build stay intact. A separate, owner-only Sites registration was reserved during hosting setup and remains unpublished; this Cloudflare preview does not use or change its audience.
