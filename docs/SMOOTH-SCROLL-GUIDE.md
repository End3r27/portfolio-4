# Complete Smooth Scrolling Implementation Guide

## 🚀 Overview

This implementation provides **buttery-smooth scrolling** across your entire Next.js website using **Lenis** - the professional smooth scroll library used by award-winning websites.

### ✨ Features

- 🎯 **Global smooth scrolling** - Works everywhere automatically
- 🖱️ **All input methods** - Mouse wheel, touch, keyboard, programmatic
- ⚡ **60fps performance** - Hardware accelerated, zero jank
- 🎨 **Fully customizable** - Speed, easing, direction, multipliers
- 📱 **Mobile optimized** - Touch gestures work perfectly
- ♿ **Accessibility** - Keyboard navigation maintained
- 🔧 **Developer friendly** - Simple hooks and utilities

## 📦 Installation

```bash
npm install lenis
```

Already installed in your project! ✅

## 🏗️ Architecture

### Files Created

```
portfolio-4/
├── components/
│   ├── SmoothScrollProvider.jsx   # Main provider component
│   ├── ClientLayout.jsx           # Client wrapper for layout
│   ├── ScrollToTop.jsx            # Scroll to top button
│   └── ScrollProgress.jsx         # Progress indicator
├── hooks/
│   └── useSmoothScroll.js         # Custom hooks for scrolling
├── app/
│   └── layout.jsx                 # Updated with provider
└── docs/
    └── SMOOTH-SCROLL-GUIDE.md     # This file
```

## 🎯 Core Implementation

### 1. SmoothScrollProvider Component

The provider wraps your entire app and enables smooth scrolling globally.

**Location:** `components/SmoothScrollProvider.jsx`

**Key Features:**
- Initializes Lenis with custom configuration
- Manages animation loop with requestAnimationFrame
- Exposes global `window.lenis` instance
- Cleans up on unmount

### 2. Integration with Next.js Layout

**Location:** `app/layout.jsx`

```jsx
import ClientLayout from '@/components/ClientLayout'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
```

**Why ClientLayout?**
- Next.js layout.jsx is a Server Component
- Lenis requires client-side rendering
- ClientLayout bridges the gap

## 🎨 Customization Options

### Basic Configuration

Edit `components/ClientLayout.jsx`:

```jsx
<SmoothScrollProvider
  duration={1.2}        // Animation duration in seconds
  lerp={0.1}           // Smoothness (0.1 = very smooth, 0.5 = responsive)
  wheelMultiplier={1}   // Mouse wheel speed (higher = faster)
  touchMultiplier={2}   // Touch scroll speed
  orientation="vertical" // 'vertical' or 'horizontal'
>
  {children}
</SmoothScrollProvider>
```

### Advanced Options

```jsx
<SmoothScrollProvider
  // Speed & Timing
  duration={1.5}                    // Longer = slower, smoother
  lerp={0.05}                       // Lower = smoother but slower response

  // Easing Function (custom animation curve)
  easing={(t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))}

  // Scroll Direction
  orientation="vertical"            // 'vertical' | 'horizontal'
  gestureOrientation="vertical"     // 'vertical' | 'horizontal' | 'both'

  // Input Multipliers
  wheelMultiplier={1}               // Mouse wheel sensitivity
  touchMultiplier={2}               // Touch/swipe sensitivity

  // Advanced Features
  infinite={false}                  // Infinite scroll loop
  autoResize={true}                 // Auto-resize on window resize
  smoothWheel={true}                // Enable smooth wheel scrolling
>
  {children}
</SmoothScrollProvider>
```

## 🔧 Usage Examples

### 1. Programmatic Scrolling

```jsx
import { scrollTo } from '@/components/SmoothScrollProvider';

// Scroll to element by selector
scrollTo('#courses', { offset: -100 });

// Scroll to pixel value
scrollTo(500, { duration: 2 });

// Scroll to top instantly
scrollTo(0, { immediate: true });

// Scroll with callback
scrollTo('#contact', {
  offset: -50,
  duration: 1.5,
  onComplete: () => console.log('Scrolled!')
});
```

### 2. Using the Hook

```jsx
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

function MyComponent() {
  const { scrollTo, scrollToTop, stopScroll, startScroll } = useSmoothScroll();

  return (
    <div>
      <button onClick={() => scrollTo('#section1')}>
        Go to Section 1
      </button>

      <button onClick={scrollToTop}>
        Back to Top
      </button>

      {/* Stop scrolling (useful for modals) */}
      <button onClick={stopScroll}>
        Disable Scroll
      </button>

      <button onClick={startScroll}>
        Enable Scroll
      </button>
    </div>
  );
}
```

### 3. Scroll Event Listener

```jsx
import { useScrollListener } from '@/hooks/useSmoothScroll';

function MyComponent() {
  useScrollListener((data) => {
    console.log('Scroll position:', data.scroll);
    console.log('Scroll velocity:', data.velocity);
    console.log('Scroll direction:', data.direction);
    console.log('Scroll progress:', data.progress);
  });

  return <div>Content</div>;
}
```

### 4. Control Scroll State

```jsx
import { toggleScroll } from '@/components/SmoothScrollProvider';

// Disable scroll (for modals, overlays)
toggleScroll(false);

// Re-enable scroll
toggleScroll(true);
```

## 🎯 Common Use Cases

### Modal/Overlay

```jsx
function Modal({ isOpen, onClose }) {
  useEffect(() => {
    toggleScroll(!isOpen);
    return () => toggleScroll(true);
  }, [isOpen]);

  return isOpen ? <div>Modal content</div> : null;
}
```

### Smooth Navigation

```jsx
function Navigation() {
  const { scrollToElement } = useSmoothScroll();

  return (
    <nav>
      <button onClick={() => scrollToElement('#home', { offset: -80 })}>
        Home
      </button>
      <button onClick={() => scrollToElement('#about', { offset: -80 })}>
        About
      </button>
      <button onClick={() => scrollToElement('#contact', { offset: -80 })}>
        Contact
      </button>
    </nav>
  );
}
```

### Parallax Effect

```jsx
function ParallaxSection() {
  const [offset, setOffset] = useState(0);

  useScrollListener((data) => {
    setOffset(data.scroll * 0.5); // Move at 50% scroll speed
  });

  return (
    <div style={{ transform: `translateY(${offset}px)` }}>
      Parallax content
    </div>
  );
}
```

## ⚙️ Customization Presets

### Preset 1: Ultra Smooth (Cinematic)
```jsx
duration: 2.0
lerp: 0.05
wheelMultiplier: 0.8
```

### Preset 2: Responsive (Snappy)
```jsx
duration: 0.8
lerp: 0.15
wheelMultiplier: 1.2
```

### Preset 3: Balanced (Default)
```jsx
duration: 1.2
lerp: 0.1
wheelMultiplier: 1.0
```

### Preset 4: Gaming/Fast
```jsx
duration: 0.6
lerp: 0.2
wheelMultiplier: 1.5
```

## 📱 Mobile Optimization

Touch scrolling is automatically optimized with:
- Native momentum scrolling on mobile
- `touchMultiplier: 2` for faster swipes
- Passive event listeners for 60fps
- Hardware acceleration

## ♿ Accessibility

Smooth scrolling maintains full accessibility:
- ✅ Keyboard navigation (arrows, Page Up/Down, Home/End)
- ✅ Screen reader support
- ✅ Focus management
- ✅ Reduced motion respect (add CSS)

### Respect Reduced Motion

Add to `globals.css`:

```css
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto !important;
  }
}
```

## 🐛 Troubleshooting

### Issue: Scroll feels too slow

**Solution:** Decrease `duration` and increase `lerp`
```jsx
duration={0.8}
lerp={0.15}
```

### Issue: Scroll feels laggy

**Solution:** Increase `lerp` for more responsive feel
```jsx
lerp={0.2}
```

### Issue: Mouse wheel too sensitive

**Solution:** Decrease `wheelMultiplier`
```jsx
wheelMultiplier={0.7}
```

### Issue: Touch scrolling too slow on mobile

**Solution:** Increase `touchMultiplier`
```jsx
touchMultiplier={2.5}
```

## 🎬 Animation Examples

### Scroll-triggered Animations

```jsx
function AnimatedSection() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useScrollListener((data) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const inView = rect.top < window.innerHeight * 0.8;
    setIsVisible(inView);
  });

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: `translateY(${isVisible ? 0 : 50}px)`,
        transition: 'opacity 0.6s, transform 0.6s'
      }}
    >
      Animated content
    </div>
  );
}
```

## 🔥 Performance Tips

1. **Use `lerp` wisely** - Lower values = smoother but more calculations
2. **Passive listeners** - Already implemented for you
3. **Transform animations** - Use `transform` instead of `top/left`
4. **RAF optimization** - Lenis handles this automatically
5. **Avoid heavy calculations** - In scroll listeners, keep logic minimal

## 📊 Comparison: Native vs Lenis

| Feature | Native CSS | Lenis |
|---------|-----------|-------|
| Smoothness | Basic | Professional |
| Customization | Limited | Extensive |
| Mobile | Good | Excellent |
| Performance | Good | Excellent |
| Control | Minimal | Full |
| Events | None | Rich API |

## 🎓 Advanced: Custom Easing Functions

### Ease Out Expo
```jsx
easing: (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
```

### Ease In Out Cubic
```jsx
easing: (t) => t < 0.5
  ? 4 * t * t * t
  : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
```

### Bounce
```jsx
easing: (t) => {
  const n1 = 7.5625;
  const d1 = 2.75;
  if (t < 1 / d1) {
    return n1 * t * t;
  } else if (t < 2 / d1) {
    return n1 * (t -= 1.5 / d1) * t + 0.75;
  } else if (t < 2.5 / d1) {
    return n1 * (t -= 2.25 / d1) * t + 0.9375;
  } else {
    return n1 * (t -= 2.625 / d1) * t + 0.984375;
  }
}
```

## 🚀 Next Steps

1. ✅ Smooth scrolling is active on your site
2. Try scrolling with mouse wheel, touch, and keyboard
3. Customize settings in `ClientLayout.jsx`
4. Use hooks for programmatic scrolling
5. Add scroll-triggered animations

## 📚 Resources

- [Lenis Documentation](https://github.com/studio-freight/lenis)
- [Easing Functions Cheat Sheet](https://easings.net/)
- [Smooth Scroll Best Practices](https://web.dev/smooth-scrolling/)

---

**Your smooth scrolling is now LIVE!** 🎉

Test it at: **http://localhost:3001**
