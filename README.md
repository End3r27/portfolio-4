# Animated Landing Page (Next.js + React)

High‑impact, animated landing page for an online learning platform combining:

- Finisher.co header animation for the hero brand/title (with graceful fallback)
- Ambient animated canvas background across the page
- Animated course preview cards with engaging hover effects and optional videos
- Smooth section reveals and a prominent call‑to‑action with animated buttons
- Responsive layout and customization via CSS variables

## Quick Start

1. Install dependencies

   ```bash
   npm install
   ```

2. Run the dev server

   ```bash
   npm run dev
   ```

3. Open `http://localhost:3000`

## Project Structure

- `app/layout.jsx` – HTML shell, Finisher script loader, globals import
- `app/page.jsx` – Landing page composition (header, courses, CTA)
- `app/globals.css` – Global styles, CSS variables, animations
- `components/FinisherHeader.jsx` – Finisher.co header + fallback gradient
- `components/AmbientCanvas.jsx` – Lightweight ambient canvas background
- `components/CourseCard.jsx` – Hover‑animated course cards with optional video
- `components/Section.jsx` and `lib/useInView.js` – Reveal on scroll
- `public/media/` – Place optional course videos/images here

## Features and Design

### Finisher.co Header

- The script is loaded in `app/layout.jsx` via a CDN using Next’s `<Script>`.
- The component attempts to construct `new FinisherHeader(...)` if available.
- If offline or the script fails to load, the header gracefully falls back to an animated gradient.

Customize the text in `components/FinisherHeader.jsx:14` and styling via `.finisher-*` classes in `app/globals.css`.

To tweak Finisher options, pass a `config` prop to `<FinisherHeader />`. Example:

```jsx
<FinisherHeader config={{ count: 12, opacity: 0.4 }} />
```

### Ambient Canvas Background

- Implemented in `components/AmbientCanvas.jsx` with a performance‑friendly RAF loop.
- Uses CSS variables `--ambient-a` and `--ambient-b` for color mixing.
- Pauses on `document.hidden` and honors `prefers-reduced-motion` for accessibility.

Place `<AmbientCanvas preset="orbs" />` near the top of your page; it appends a fixed canvas to `document.body`.

### Course Cards with Hover Previews

- `components/CourseCard.jsx` supports `videoSrc` and `poster` props for animated previews.
- On hover, videos play; on leave, the video resets.
- Includes a glare/lighting overlay that tracks cursor position and an animated “Enroll” CTA.

Add your media to `public/media/` and reference them, e.g.:

```jsx
<CourseCard
  title="Next.js from Zero to Pro"
  description="Build production apps with the App Router."
  tags={["Next.js", "React"]}
  videoSrc="/media/nextjs-preview.mp4"
  poster="/media/nextjs-thumb.jpg"
/> 
```

### CTA and Section Transitions

- `components/CTA.jsx` provides a prominent call‑to‑action with animated, glowing buttons.
- Sections use `IntersectionObserver` via `useInView` to animate in smoothly.

## Customization

### Colors (Branding)

Edit CSS variables in `app/globals.css:1`:

- `--brand-1`, `--brand-2` – hero gradient
- `--ambient-a`, `--ambient-b` – ambient canvas colors
- `--cta-1`, `--cta-2` – CTA glow colors
- `--bg`, `--bg-2`, `--text`, `--muted` – base theme

### Animation Presets and Performance

- Ambient canvas defaults: `preset="orbs"`, `density={14}`, `intensity={0.38}`.
- For lower‑end devices, reduce density or honor `prefers-reduced-motion` on the OS.

### Responsive

The layout uses a 12‑column CSS grid and adaptive typography (`clamp`). Cards collapse to 1/2/3 columns across mobile/tablet/desktop.

## Using External Animation Libraries (Optional)

If you want to swap to the official libraries:

1. Finisher.co Header
   - Keep the CDN `<Script>` in `app/layout.jsx` or self‑host it.
   - Pass a config object that matches the Finisher API in `FinisherHeader`.

2. AmbientCanvasBackgrounds
   - Replace `components/AmbientCanvas.jsx` with your preferred preset from
     https://github.com/crnacura/AmbientCanvasBackgrounds, or import it via a script tag.
   - Keep the canvas positioned fixed with `#ambient-canvas` styles.

## Accessibility Notes

- Ambient animation pauses when the tab is hidden and respects `prefers-reduced-motion`.
- Buttons and interactive elements have clear states and readable contrast.

## Deploy

Build and run:

```bash
npm run build
npm start
```

Deploy to your provider of choice (Vercel, Netlify, etc.).

