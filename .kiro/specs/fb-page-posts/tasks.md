# Tasks: fb-page-posts

## Task 1: Project Scaffolding

- [x] 1.1 Initialize Next.js project with TypeScript and App Router
- [x] 1.2 Install dependencies: `react`, `react-dom`, `next` (dev: `typescript`, `@types/react`, `@types/node`)
- [x] 1.3 Create `app/layout.tsx` with root HTML structure, viewport meta, and global CSS import
- [x] 1.4 Create `app/globals.css` with responsive layout styles (centered container, max-width 720px, full-width on mobile ≤768px)
- [x] 1.5 Create `.env.example` with `NEXT_PUBLIC_FACEBOOK_PAGE_URL=`
- [x] 1.6 Create `README.md` documenting environment variables and setup steps

## Task 2: FacebookEmbed Component

- [x] 2.1 Create `app/components/FacebookEmbed.tsx` as a `"use client"` component accepting `pageUrl: string` prop
- [x] 2.2 Implement config error state: if `pageUrl` is empty/undefined, render a configuration error message
- [x] 2.3 Render the `<div class="fb-page">` markup with attributes: `data-href={pageUrl}`, `data-tabs="timeline"`, `data-height="500"`, `data-small-header="true"`, `data-adapt-container-width="true"`
- [x] 2.4 Render a fallback `<blockquote>` inside the fb-page div with a direct `<a>` link to `pageUrl`
- [x] 2.5 Implement Facebook JS SDK script injection in a `useEffect` hook (load `connect.facebook.net/en_US/sdk.js`, call `FB.init` with `xfbml: true`)
- [x] 2.6 Implement `sdkStatus` state (`"loading"` | `"ready"` | `"error"`) with a 10-second timeout for SDK load failure
- [x] 2.7 Show a loading indicator while `sdkStatus` is `"loading"`
- [x] 2.8 Show an error message with a direct link when `sdkStatus` is `"error"`

## Task 3: Home Page Integration

- [x] 3.1 Create `app/page.tsx` that reads `process.env.NEXT_PUBLIC_FACEBOOK_PAGE_URL` and passes it to `FacebookEmbed`
- [x] 3.2 Apply responsive container styles: centered, max-width 720px on desktop, full-width with padding on mobile

## Task 4–6: Tests

- [x] Removed by user request

## Task 7: Deployment Prep

- [x] 7.1 Verify `next.config.ts` is valid for Vercel deployment
- [x] 7.2 Initialize git repo with remote origin `git@github.com:jyllan/fb-beaulieu.git`
- [x] 7.3 Create `.gitignore` for Next.js project (node_modules, .next, .env.local)
