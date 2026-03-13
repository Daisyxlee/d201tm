# District 201 Toastmasters Website

**d201tm.org** — Official website for District 201 Toastmasters International.

## Features

- **Public website** aligned with Toastmasters branding (maroon, navy, gold, cream)
- Content based on the District 201 Operating Procedures Manual (effective July 1, 2026)
- **Admin portal** for approved users to edit dynamic content (officers, events, resources, contact)
- **Google Workspace federated login** — only approved admin emails can sign in
- **Superadmin** can add/remove admin users
- Ready for **GitHub Pages** hosting and custom domain redirect

## Project Structure

```
d201tm/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── page.tsx      # Home
│   │   ├── about/        # About District 201
│   │   ├── officers/     # District leadership
│   │   ├── resources/    # Resources & operating manual
│   │   ├── calendar/     # Events
│   │   ├── contact/      # Contact
│   │   ├── admin/        # Admin portal & user management
│   │   └── api/          # API routes (auth, admin content)
│   ├── components/       # Header, Footer, SessionProvider
│   ├── lib/              # Auth config, dynamic content, admin users
│   └── data/             # JSON data files (officers, events, etc.)
├── .github/workflows/    # GitHub Actions for Pages deploy
├── DEPLOYMENT.md         # Deployment & domain setup
└── README.md             # This file
```

## Quick Start

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Run locally**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

3. **Environment variables** (for admin features)

   Create `.env.local`:

   ```
   GOOGLE_CLIENT_ID=...
   GOOGLE_CLIENT_SECRET=...
   GOOGLE_WORKSPACE_DOMAIN=yourdomain.com   # optional
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=random-secret
   ```

4. **Initial superadmin**

   Add your email to `src/data/superadmins.json`:

   ```json
   { "superadmins": ["your@email.com"] }
   ```

## Deployment

- **Static (GitHub Pages):** Set `NEXT_PUBLIC_STATIC_EXPORT=true` and `NEXT_PUBLIC_BASE_PATH=/d201tm`. Public pages deploy via GitHub Actions. Admin/auth require a server.
- **Full stack (Vercel):** Deploy without static export. All features work. Point d201tm.org here when domain is purchased.

See [DEPLOYMENT.md](./DEPLOYMENT.md) for details.

## Content Sources

Historical reference and design inspiration from:

- [district1toastmasters.org](https://district1toastmasters.org/)
- [district52.org](https://www.district52.org/)
- [d100tm.org](https://d100tm.org/)
- [toastmasters.org](https://toastmasters.org/)

Content structure follows the District 201 Operating Procedures Manual (effective July 1, 2026).

git add .
git commit -m "Trigger deploy"
git push origin main