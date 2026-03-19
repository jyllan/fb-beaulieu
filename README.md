# Facebook Page Posts

A Next.js application that embeds and displays the latest posts from a public Facebook page using the official Facebook Page Plugin.

## Prerequisites

- [Node.js](https://nodejs.org/) 18+ or [Bun](https://bun.sh/)
- A public Facebook page URL

## Environment Variables

| Variable                        | Required | Description                                                                      |
| ------------------------------- | -------- | -------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_FACEBOOK_PAGE_URL` | Yes      | Full URL of the target Facebook page (e.g., `https://www.facebook.com/YourPage`) |

## Setup

1. Clone the repository:

   ```bash
   git clone git@github.com:jyllan/fb-beaulieu.git
   cd fb-beaulieu
   ```

2. Install dependencies:

   ```bash
   bun install
   ```

3. Create a `.env.local` file from the example:

   ```bash
   cp .env.example .env.local
   ```

4. Set `NEXT_PUBLIC_FACEBOOK_PAGE_URL` in `.env.local` to your Facebook page URL.

5. Start the development server:

   ```bash
   bun run dev
   ```

   The app will be available at [http://localhost:3000](http://localhost:3000).

## Deployment (Vercel)

1. Push the repository to GitHub.
2. Import the project in [Vercel](https://vercel.com/).
3. Add the `NEXT_PUBLIC_FACEBOOK_PAGE_URL` environment variable in the Vercel project settings.
4. Deploy — Vercel auto-detects Next.js and handles the build.
