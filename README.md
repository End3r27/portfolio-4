# 🎨 Animated Learning Platform Landing Page

A modern, animated landing page built with Next.js 14, featuring smooth scrolling, particle animations, and optimized for GitHub Pages deployment.

## ✨ Features

- 🌊 **Swirl Particle Background** - Beautiful flowing purple particles using Canvas
- 🎆 **Finisher Header Animation** - Large colorful particles with custom configuration
- 🖱️ **Buttery Smooth Scrolling** - Global smooth scroll powered by Lenis
- 📊 **Scroll Progress Bar** - Visual indicator at top of page
- ⬆️ **Scroll to Top Button** - Animated floating button
- 🎬 **Reveal Animations** - Sections fade in on scroll with stagger effects
- 📱 **Fully Responsive** - Optimized for all devices
- ⚡ **Static Export** - Optimized for GitHub Pages

## 🚀 Live Demo

Visit: `https://YOUR_USERNAME.github.io/portfolio-4/`

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Git

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## 🚀 Deploy to GitHub Pages

### Quick Deploy (3 steps):

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/portfolio-4.git
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to Settings → Pages
   - Select **GitHub Actions** as source

3. **Done!**
   - Site deploys automatically
   - Live at: `https://YOUR_USERNAME.github.io/portfolio-4/`

## 📦 Build for Production

```bash
# Build static site
npm run build

# Output in /out directory
```

## 🎨 Customization

### Smooth Scrolling

Edit `components/ClientLayout.jsx`:

```javascript
<SmoothScrollProvider
  duration={1.2}        // Animation duration
  lerp={0.1}           // Smoothness (0.05-0.2)
  wheelMultiplier={1}   // Mouse wheel speed
  touchMultiplier={2}   // Touch scroll speed
>
```

**Presets:**
- **Cinematic:** `duration: 2.0, lerp: 0.05`
- **Balanced:** `duration: 1.2, lerp: 0.1` (default)
- **Snappy:** `duration: 0.8, lerp: 0.15`

### Header Particles

Edit `app/page.jsx`:

```javascript
config={{
  count: 12,                        // Number of particles
  size: { min: 1300, max: 1500 },  // Particle size
  colors: {
    background: "transparent",
    particles: ["#ff681c", "#87ddfe", "#231efe", "#ff0a53"],
  },
  // ... more options
}}
```

### Background Color

Edit `app/globals.css`:

```css
body {
  background: hsla(260, 40%, 5%, 1); /* Dark purple */
}
```

## 📁 Project Structure

```
portfolio-4/
├── app/
│   ├── globals.css           # Global styles
│   ├── layout.jsx           # Root layout
│   └── page.jsx             # Home page
├── components/
│   ├── ClientLayout.jsx      # Smooth scroll wrapper
│   ├── FinisherHeader.jsx    # Animated header
│   ├── SwirlBackground.jsx   # Particle background
│   ├── ScrollProgress.jsx    # Progress bar
│   ├── ScrollToTop.jsx       # Back to top button
│   ├── Section.jsx           # Reveal animations
│   ├── CourseCard.jsx        # Course cards
│   └── CTA.jsx              # Call to action
├── hooks/
│   └── useSmoothScroll.js   # Scroll utilities
├── lib/
│   ├── simplex-noise.js     # Noise generator
│   └── canvas-utils.js      # Canvas helpers
├── docs/
│   ├── DEPLOYMENT.md        # Full deployment guide
│   ├── TROUBLESHOOTING.md   # Common issues
│   └── SMOOTH-SCROLL-GUIDE.md
├── .github/
│   └── workflows/
│       └── deploy.yml       # Auto-deployment
└── next.config.js           # Next.js config
```

## 🧩 Tech Stack

- **Framework:** Next.js 14.2.5
- **UI Library:** React 18.2.0
- **Smooth Scroll:** Lenis 1.3.14
- **Animations:** Canvas API, SimplexNoise
- **Styling:** CSS3, CSS Variables
- **Deployment:** GitHub Pages, GitHub Actions

## 📚 Documentation

- [Deployment Guide](docs/DEPLOYMENT.md)
- [Troubleshooting](docs/TROUBLESHOOTING.md)
- [Smooth Scrolling](docs/SMOOTH-SCROLL-GUIDE.md)

## 🐛 Troubleshooting

**Animations not showing after deployment?**
- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh (Ctrl+F5)
- Wait 2-3 minutes for full deployment

**404 Error?**
- Check GitHub Pages settings
- Ensure Source is "GitHub Actions"

**Build fails?**
- Check Actions tab for errors
- Run `npm run build` locally first

See [TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md) for more solutions.

## ⚡ Performance

- **First Load JS:** 97.9 kB (optimized)
- **Build Time:** ~30-60 seconds
- **Deploy Time:** ~2-3 minutes
- **Lighthouse Score:** 90+

## 🎯 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 License

MIT License - Feel free to use for your projects!

## 🙏 Credits

- **Lenis** - Smooth scroll library
- **Finisher.co** - Header animation inspiration
- **SimplexNoise** - Particle animation noise

---

**Built with ❤️ using Next.js and deployed on GitHub Pages**

Visit: `https://YOUR_USERNAME.github.io/portfolio-4/`
