# District 201 Website – Deployment Guide

## Architecture

- **Public site (GitHub Pages):** Static HTML/CSS/JS export for d201tm.org.
- **Admin + Auth (Vercel or Node host):** Dynamic routes for NextAuth, API routes for content management.

### Two Deployment Options

#### Option A: Static-only (GitHub Pages)
- Use `NEXT_PUBLIC_STATIC_EXPORT=true` and `NEXT_PUBLIC_BASE_PATH=/d201tm`.
- Public pages only. Admin portal will redirect to sign-in and requires a separate backend.

#### Option B: Full Stack (Recommended for admin features)
- Deploy to **Vercel** (recommended) or another Node.js host.
- Enables NextAuth (Google Workspace sign-in) and admin API routes.
- Point d201tm.org to this deployment when domain is purchased.

## Domain Redirect Setup

1. Purchase d201tm.org and add as custom domain in GitHub Pages or Vercel.
2. Configure DNS:
   - **A record:** `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` (GitHub Pages)
   - **CNAME (optional):** `username.github.io` for `www.d201tm.org`
3. In repository Settings → Pages → Custom domain, add `d201tm.org`.
4. Enable "Enforce HTTPS".

## GitHub Pages (static site)

1. Push repo to GitHub.
2. Settings → Pages → Source: **GitHub Actions**.
3. On push to `main`, workflow builds and deploys to Pages.
4. Live at: `https://username.github.io/d201tm/`

## Environment Variables (full-stack deployment)

```env
# Google OAuth (create at https://console.cloud.google.com/)
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret

# Optional: restrict to Google Workspace domain
GOOGLE_WORKSPACE_DOMAIN=yourdomain.com

# NextAuth
NEXTAUTH_URL=https://d201tm.org
NEXTAUTH_SECRET=generate-a-random-secret
```

## Initial Superadmin Setup

1. Edit `src/data/superadmins.json` and add the superadmin email(s).
2. Commit and deploy. Those emails can then add/remove other admins via the admin portal.
