# Saleh Kayyali's Portfolio

A modern, terminal-inspired portfolio website built with Next.js and TypeScript.

## Features

- Interactive terminal interface
- Theme switching capability with 5 custom themes
- Responsive design for mobile and desktop
- Project showcase with markdown support
- Accessible keyboard navigation
- SEO optimized

## Tech Stack

- Next.js 15
- TypeScript
- React Terminal UI
- React Markdown
- Geist Font
- CSS Modules

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Commands

The terminal interface supports the following commands:
- `help`: Show available commands
- `theme`: Change terminal theme (cycles through 5 themes)
- `links`: Show social links
- `clear`: Clear terminal screen

## Project Structure

```
src/
  ├── app/
  │   ├── components/     # React components
  │   ├── content/        # Markdown content
  │   ├── themes.ts       # Theme configurations
  │   ├── layout.tsx      # Root layout with metadata
  │   └── page.tsx        # Home page
  └── public/
      ├── images/         # Image assets
      └── content/        # Public markdown files
```

## SEO

The site is optimized for search engines with:
- Structured data (Schema.org)
- OpenGraph metadata
- Twitter card metadata
- Semantic HTML
- Proper meta descriptions and titles

## License

MIT © Saleh Kayyali
