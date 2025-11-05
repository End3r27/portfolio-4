# 🔧 Deployment Troubleshooting Guide

## Common Issues After Deployment

### ❌ Issue: Animated Header Not Showing

**Symptoms:**
- Header shows but no particle animations
- Console error: "Failed to load resource: /vendor/finisher-header.es5.min.js"

**Cause:**
Asset paths need to account for GitHub Pages base path `/portfolio-4/`

**Solution:** ✅ Already Fixed!
The FinisherHeader component now automatically handles base path in production:
```javascript
const basePath = process.env.NODE_ENV === 'production' ? '/portfolio-4' : '';
```

**If issue persists:**
1. Clear browser cache (Ctrl+Shift+Delete)
2. Hard refresh (Ctrl+F5)
3. Check browser console for errors
4. Verify CDN fallback is working: `https://cdn.jsdelivr.net/npm/finisher-header@1.3.1/dist/finisher-header.es5.min.js`

---

### ❌ Issue: 404 Page Not Found

**Symptoms:**
- Site shows GitHub 404 page

**Solutions:**

1. **Check GitHub Pages Settings:**
   - Go to Settings → Pages
   - Ensure Source is set to "GitHub Actions"
   - NOT "Deploy from branch"

2. **Verify Base Path:**
   - Check `next.config.js`:
   ```javascript
   basePath: '/portfolio-4'
   ```

3. **Check URL:**
   - Correct: `https://USERNAME.github.io/portfolio-4/`
   - Wrong: `https://USERNAME.github.io/`

---

### ❌ Issue: Assets Not Loading (CSS, JS, Images)

**Symptoms:**
- Page loads but unstyled
- Console errors: "Failed to load resource"

**Solutions:**

1. **Clear Browser Cache:**
   ```
   Ctrl+Shift+Delete → Clear cached images and files
   ```

2. **Hard Refresh:**
   ```
   Ctrl+F5 or Cmd+Shift+R
   ```

3. **Check Build Output:**
   ```bash
   npm run build
   # Look for errors in output
   ```

4. **Verify .nojekyll exists:**
   - File should be in `public/.nojekyll`
   - Gets copied to `out/.nojekyll` during build

---

### ❌ Issue: Smooth Scrolling Not Working

**Symptoms:**
- Regular scroll instead of smooth scroll
- Jerky/choppy scrolling

**Solutions:**

1. **Check Console:**
   - Open DevTools → Console
   - Look for Lenis errors

2. **Verify Lenis Loaded:**
   ```javascript
   // In browser console
   console.log(window.lenis)
   // Should output Lenis instance
   ```

3. **Rebuild:**
   ```bash
   npm run build
   git add .
   git commit -m "Rebuild"
   git push
   ```

---

### ❌ Issue: GitHub Actions Workflow Fails

**Symptoms:**
- Red X in Actions tab
- Site not deploying

**Solutions:**

1. **Check Actions Tab:**
   - Click on failed workflow
   - Read error messages

2. **Common Fixes:**

   **Missing package-lock.json:**
   ```bash
   npm install
   git add package-lock.json
   git commit -m "Add package-lock.json"
   git push
   ```

   **Node version mismatch:**
   - Ensure `.github/workflows/deploy.yml` uses Node 18+
   ```yaml
   node-version: '18'
   ```

   **Build fails:**
   ```bash
   # Test build locally first
   npm run build

   # Fix errors, then commit
   git add .
   git commit -m "Fix build errors"
   git push
   ```

---

### ❌ Issue: Animations Look Different on Production

**Symptoms:**
- Animations slower/faster than local
- Colors different

**Solutions:**

1. **Check Browser:**
   - Try different browser
   - Check if hardware acceleration is enabled

2. **Performance:**
   - Mobile devices may perform differently
   - Consider reducing particle count for mobile

3. **Colors:**
   - Monitor calibration differences
   - HSL values may render slightly different

---

### ❌ Issue: Mobile Scrolling Issues

**Symptoms:**
- Scroll doesn't work on mobile
- Choppy/laggy on touch devices

**Solutions:**

1. **Check Mobile Browser:**
   - Test on Safari, Chrome mobile
   - Some older browsers may not support smooth scroll

2. **Lenis Touch Settings:**
   - Already configured with `touchMultiplier: 2`
   - Optimized for mobile

3. **Disable if needed:**
   - Edit `components/ClientLayout.jsx`
   - Reduce touch multiplier if too sensitive

---

### ❌ Issue: Long Initial Load Time

**Symptoms:**
- Takes 5+ seconds to load

**Solutions:**

1. **Check Network:**
   - Open DevTools → Network
   - Look for slow resources

2. **Optimize:**
   - Animations load on-demand
   - CDN fallback for Finisher header
   - All assets minified

3. **Cache:**
   - After first load, browser caches assets
   - Subsequent loads should be faster

---

## 🔍 Debug Checklist

Before asking for help, verify:

- [ ] Latest code pushed to GitHub
- [ ] GitHub Actions workflow succeeded (green checkmark)
- [ ] Visited correct URL: `https://USERNAME.github.io/portfolio-4/`
- [ ] Cleared browser cache
- [ ] Tried hard refresh (Ctrl+F5)
- [ ] Checked browser console for errors
- [ ] Tested on different browser
- [ ] Verified GitHub Pages settings

---

## 📊 Performance Benchmarks

**Expected Load Times:**
- First visit: 2-4 seconds
- Cached visit: 0.5-1 second
- Time to Interactive: 1-2 seconds

**Expected Build Times:**
- Local build: 30-60 seconds
- GitHub Actions: 2-3 minutes total

---

## 🆘 Still Having Issues?

1. **Check Browser Console:**
   - F12 → Console tab
   - Copy any error messages

2. **Check Network Tab:**
   - F12 → Network tab
   - Look for failed requests (red)

3. **Test Locally:**
   ```bash
   npm run build
   npx serve out
   # Visit http://localhost:3000/portfolio-4/
   ```

4. **Compare with Local:**
   - Does it work locally?
   - If yes, issue is deployment-related
   - If no, issue is in code

---

## ✅ Verification Steps

After any fix:

1. **Rebuild:**
   ```bash
   npm run build
   ```

2. **Commit & Push:**
   ```bash
   git add .
   git commit -m "Fix: [describe fix]"
   git push
   ```

3. **Wait for Deployment:**
   - Check Actions tab
   - Wait for green checkmark

4. **Clear Cache & Test:**
   - Clear browser cache
   - Hard refresh (Ctrl+F5)
   - Test all features

---

## 📞 Quick Fixes Summary

| Issue | Quick Fix |
|-------|-----------|
| No animations | Clear cache + hard refresh |
| 404 error | Check GitHub Pages settings |
| Assets not loading | Verify .nojekyll exists |
| Workflow fails | Check Actions tab for details |
| Slow loading | Normal on first visit, cache helps |
| Mobile issues | Test on multiple devices |

---

**Most issues are solved by:** Clear cache + Hard refresh! 🔄
