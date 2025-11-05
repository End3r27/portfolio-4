# Smooth Scroll Quick Reference

## 🎯 Basic Usage

### Import the helpers
```jsx
import { scrollTo, toggleScroll } from '@/components/SmoothScrollProvider';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
```

## 📝 Common Patterns

### 1. Scroll to Element
```jsx
// Simple
scrollTo('#section-id');

// With offset (useful for fixed headers)
scrollTo('#section-id', { offset: -80 });

// With custom duration
scrollTo('#section-id', { duration: 2, offset: -100 });
```

### 2. Scroll to Position
```jsx
// Scroll to 500px
scrollTo(500);

// Instant scroll (no animation)
scrollTo(1000, { immediate: true });
```

### 3. Scroll to Top
```jsx
scrollTo(0);

// Or use the hook
const { scrollToTop } = useSmoothScroll();
scrollToTop();
```

### 4. Using Hook in Component
```jsx
function MyComponent() {
  const { scrollTo, scrollToTop, stopScroll, startScroll } = useSmoothScroll();

  return (
    <div>
      <button onClick={() => scrollTo('#contact')}>Contact</button>
      <button onClick={scrollToTop}>Top</button>
    </div>
  );
}
```

### 5. Disable/Enable Scroll (for Modals)
```jsx
function Modal({ isOpen }) {
  useEffect(() => {
    toggleScroll(!isOpen); // Disable when open
    return () => toggleScroll(true); // Re-enable on unmount
  }, [isOpen]);
}
```

## ⚙️ Configuration Presets

Edit `components/ClientLayout.jsx`:

### Cinematic (Ultra Smooth)
```jsx
<SmoothScrollProvider
  duration={2.0}
  lerp={0.05}
  wheelMultiplier={0.8}
>
```

### Default (Balanced)
```jsx
<SmoothScrollProvider
  duration={1.2}
  lerp={0.1}
  wheelMultiplier={1}
>
```

### Snappy (Responsive)
```jsx
<SmoothScrollProvider
  duration={0.8}
  lerp={0.15}
  wheelMultiplier={1.2}
>
```

## 🎨 Customization Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| `duration` | `1.2` | Animation duration (seconds) |
| `lerp` | `0.1` | Smoothness (0-1, lower = smoother) |
| `wheelMultiplier` | `1` | Mouse wheel speed |
| `touchMultiplier` | `2` | Touch scroll speed |
| `orientation` | `'vertical'` | Scroll direction |

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| Too slow | ↓ `duration`, ↑ `lerp` |
| Too laggy | ↑ `lerp` |
| Wheel too sensitive | ↓ `wheelMultiplier` |
| Touch too slow | ↑ `touchMultiplier` |

## 📚 Components Available

- ✅ `<ScrollProgress />` - Progress bar at top
- ✅ `<ScrollToTop />` - Floating back-to-top button
- ✅ `<SmoothScrollProvider />` - Global smooth scroll

## 🎯 Real-World Examples

### Navigation Menu
```jsx
function Nav() {
  return (
    <nav>
      <a onClick={() => scrollTo('#home', { offset: -60 })}>Home</a>
      <a onClick={() => scrollTo('#about', { offset: -60 })}>About</a>
      <a onClick={() => scrollTo('#contact', { offset: -60 })}>Contact</a>
    </nav>
  );
}
```

### Hero CTA Button
```jsx
<button onClick={() => scrollTo('#courses', { offset: -100, duration: 1.5 })}>
  Explore Courses
</button>
```

### Table of Contents
```jsx
function TOC({ sections }) {
  return (
    <ul>
      {sections.map(section => (
        <li key={section.id}>
          <button onClick={() => scrollTo(`#${section.id}`, { offset: -80 })}>
            {section.title}
          </button>
        </li>
      ))}
    </ul>
  );
}
```

---

**Need more help?** See `docs/SMOOTH-SCROLL-GUIDE.md` for the complete guide.
