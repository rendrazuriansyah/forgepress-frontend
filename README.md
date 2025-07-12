# ForgePress Frontend (Next.js Blog)

## Description

ForgePress Frontend is a modern blog platform built with Next.js, TypeScript, and Tailwind CSS. It consumes content from a Headless CMS (Strapi) via REST API, supports Markdown posts, and is optimized for SEO and performance. Perfect for developers, tech writers, and anyone who wants a fast, customizable blog.

## Key Features

- Dynamic blog posts from Strapi API
- Markdown rendering with syntax highlighting
- Category-based filtering
- Responsive UI with Tailwind CSS
- SEO optimization (Open Graph, Twitter Cards, sitemap.xml, robots.txt)
- Image optimization with `next/image`
- Social sharing buttons
- Static export support (optional)

## Tech Stack

- **Frontend:** Next.js (App Router), React.js, TypeScript
- **Styling:** Tailwind CSS
- **Markdown Processing:** gray-matter, remark, rehype-highlight, remark-gfm
- **Tools:** VS Code, Prettier, ESLint
- **Deployment:** Vercel, Static Export

## Installation & Setup

```bash
git clone https://github.com/rendrazuriansyah/nextjs-headless-cms-manual.git
cd forgepress-frontend
npm install
npm run dev
```

- Access the app at: `http://localhost:3000`
- Make sure the backend (Strapi) is running at `http://localhost:1337`

## Environment Configuration

Create a `.env.local` file in the root directory:

```
STRAPI_API_URL=http://localhost:1337
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> Adjust URLs if deploying to production.

## Project Structure

```
.
├── app/                # Next.js pages & routes
├── components/         # Reusable React components
├── lib/                # Utility functions (API, markdown, etc.)
├── posts/              # Markdown files (if using local posts)
├── public/             # Static assets (images, favicon)
├── styles/             # Global styles
├── .env.local          # Environment variables
└── README.md
```

## Demo / Screenshot

- [Live Demo](https://github.com/rendrazuriansyah/nextjs-headless-cms-manual)
- ![Homepage Screenshot](https://raw.githubusercontent.com/rendrazuriansyah/nextjs-headless-cms-manual/main/public/og-image.jpg)

## Contributing

Contributions are welcome! Please fork the repo and submit a pull request.

## License

MIT

## Contact

Rendra Zuriansyah

- [GitHub Profile](https://github.com/rendrazuriansyah/)
- [LinkedIn Profile](https://www.linkedin.com/in/abdullahrendrazuriansyah/)
