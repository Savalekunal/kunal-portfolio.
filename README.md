# Kunal Savale — QA Portfolio

A personal portfolio site for Kunal Savale (QA Automation Engineer / SDET), built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Framer Motion, and Three.js/React Three Fiber. All resume content lives in [`src/lib/data.ts`](src/lib/data.ts) — edit that one file to update anything on the site.

## The 3D pieces

- **Cinematic intro** (`src/components/intro/`, `src/three/`): plays once per session on first visit — a robot character interacts with a floating app mockup, it breaks, a bug-catcher bot grabs the defect, four text beats introduce Kunal. Skippable, respects `prefers-reduced-motion` (skips straight through), and falls back to a lightweight CSS/SVG version on narrow/low-power devices. No 3D model files — everything is built from Three.js primitives.
- **Interactive hub** (`src/components/hub/`, `src/three/HubScene.tsx`): replaces the old static photo in the hero. Desktop gets a real 3D scene — your photo (or initials, until you add one) at the center, eight orbiting nodes for Experience/Skills/GenAI Testing/Projects/QA Lab/Achievements/Resume/Contact, click any node to scroll there. Mobile gets a plain card grid, zero WebGL.
- **Preview query params** (handy for revisiting these without clearing session storage): `?intro=1` replays the intro even if already seen or reduced-motion is on; `?force3d=1` (or `=0`) overrides the 3D-vs-fallback device detection. Combine them: `/?intro=1&force3d=1`.

## Before you deploy — things to finish

- **Photo**: `profile.photo` in `src/lib/data.ts` is `null`, so the hero hub shows your initials instead. Drop a real headshot into `public/` (e.g. `public/photo.jpg`) and set `profile.photo = "/photo.jpg"` — it's picked up by both the 3D hub and the mobile fallback automatically.
- **Instagram**: `profile.links.instagram` is a placeholder (`https://instagram.com/`). Replace it with your real profile URL, and set `instagramIsPlaceholder: false`.
- **Contact form**: wired to [FormSubmit.co](https://formsubmit.co) using your email directly — no signup needed. **The first message sent will trigger a one-time confirmation email to savalekunal07@gmail.com** — click the link inside it to activate the form. Until then, submissions will still show "sent" client-side but won't arrive in your inbox.
- **Site URL**: `siteUrl` is set to a placeholder (`https://kunal-savale-qa.vercel.app`) in `src/app/layout.tsx`, `sitemap.ts`, and `robots.ts`. Update all three once you know your real deployed domain.
- **Company badges**: intentionally text-based monograms (not real logos), to avoid any trademark/misuse issue with sourcing logo image files.

## Local development

Requires Node.js 18.18+.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # serve the production build locally
npm run lint    # ESLint
```

## Deploying for free

**Vercel (recommended — built by the Next.js team, zero config):**

```bash
npx vercel
```

Follow the prompts (log in, link/create a project). Subsequent deploys: `npx vercel --prod`. Or connect the GitHub repo at [vercel.com/new](https://vercel.com/new) for automatic deploys on every push.

**Cloudflare Pages (alternative, also free):**

```bash
npm run build
```

Connect the repo at [pages.cloudflare.com](https://pages.cloudflare.com), framework preset "Next.js".

Either way you get a public `https://…` URL with $0 hosting, suitable for adding to LinkedIn.

## Structure

- `src/lib/data.ts` — all resume content (single source of truth)
- `src/components/sections/` — one file per homepage section
- `src/components/sections/qa-lab/` — the QA Engineering Command Center subsections (dashboard, test pipeline, GenAI testing explainer, bug board, testing process)
- `src/components/ui/` — small reusable primitives (Reveal, Tooltip, StatusBadge, CountUp, SectionHeading)
- `src/app/layout.tsx` — fonts, SEO metadata, JSON-LD structured data, theme provider
- `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/opengraph-image.tsx`, `src/app/icon.tsx` — SEO/social file conventions
