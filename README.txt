
# Astrus Insurance Services — Website

## Quick Start (Local Development)

1. Make sure you have **Node.js 18+** installed
2. Open a terminal in this folder
3. Run:
   ```
   npm install
   npm run dev
   ```
4. Open http://localhost:5173 in your browser

## Deploy to Vercel (Recommended)

1. Create a GitHub account (if you don't have one)
2. Create a new repository called `astrus-website`
3. Upload the **contents** of this folder to the repository
4. Go to https://vercel.com
5. Sign in with GitHub
6. Click "New Project"
7. Select the `astrus-website` repository
8. Framework preset: **Vite** (should auto-detect)
9. Click **Deploy**

Your site will be live in about 60 seconds.

## Deploy to Netlify (Alternative)

1. Go to https://app.netlify.com
2. Drag and drop the `dist` folder (after running `npm run build`) onto the page
3. Done — your site is live

## Project Structure

```
├── index.html          — Entry HTML (meta tags, favicon)
├── package.json        — Dependencies and scripts
├── vite.config.js      — Vite + React config
├── public/
│   └── logo.png        — Astrus logo (used as favicon + header)
└── src/
    ├── main.jsx        — React entry point
    └── App.jsx         — Full website (single-file React app)
```

## What's Included

- Responsive design (desktop + mobile with hamburger menu)
- Form validation with inline error messages
- Confirmation popup before opening email client
- Toast notifications for success/error feedback
- Smooth scroll navigation
- Scroll-to-top button
- Type-specific quotation forms (motor, medical, property, workmen, other)
- Professional typography (DM Sans + Playfair Display)
- SEO meta tags and favicon
