# 🚀 GitHub Pages Deployment Guide

## Overview

This project is configured for automatic deployment to GitHub Pages under the path `/portfolio-4/`.

## 📋 Prerequisites

- GitHub repository created
- Git initialized locally
- Node.js 18+ installed

## 🛠️ Configuration

### Next.js Configuration (`next.config.js`)

```javascript
const nextConfig = {
  output: 'export',           // Static export
  basePath: '/portfolio-4',   // GitHub Pages subdirectory
  trailingSlash: true,        // URL compatibility
  reactStrictMode: true,
  images: { unoptimized: true },
};
```

### Package.json Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",      // Builds to /out directory
    "export": "next build",     // Same as build for static export
    "deploy": "npm run export && touch out/.nojekyll && git add out && git commit -m 'Deploy to GitHub Pages' && git subtree push --prefix out origin gh-pages"
  }
}
```

## 🚀 Deployment Methods

### Method 1: Automatic Deployment (Recommended)

**GitHub Actions** will automatically deploy on every push to `main` branch.

#### Setup Steps:

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/portfolio-4.git
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**

3. **Workflow will run automatically:**
   - Check **Actions** tab to see deployment progress
   - Once complete, site will be live at: `https://YOUR_USERNAME.github.io/portfolio-4/`

### Method 2: Manual Deployment

If you prefer manual deployment:

```bash
# Build the project
npm run build

# Deploy using subtree
git add .
git commit -m "Build for deployment"
git subtree push --prefix out origin gh-pages
```

Or use the combined script:

```bash
npm run deploy
```

## 📁 Project Structure

```
portfolio-4/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── out/                        # Build output (gitignored)
├── public/
│   └── .nojekyll              # Prevents Jekyll processing
├── next.config.js              # Next.js configuration
└── package.json
```

## 🔍 Verification

After deployment, verify your site:

1. **Check GitHub Actions:**
   - Go to **Actions** tab
   - Ensure workflow completed successfully (green checkmark)

2. **Visit your site:**
   - URL: `https://YOUR_USERNAME.github.io/portfolio-4/`

3. **Test features:**
   - ✅ Swirl background animation
   - ✅ Finisher header animation
   - ✅ Smooth scrolling
   - ✅ Scroll progress bar
   - ✅ Scroll to top button
   - ✅ Course cards animations

## 🐛 Troubleshooting

### Issue: 404 Page Not Found

**Solution:**
- Ensure `basePath: '/portfolio-4'` in `next.config.js`
- Check GitHub Pages settings point to correct source
- Verify repository name matches base path

### Issue: Assets Not Loading

**Solution:**
- Ensure `images: { unoptimized: true }` in next.config.js
- Check all asset paths use relative paths
- Verify `.nojekyll` file exists in build output

### Issue: Smooth Scrolling Not Working

**Solution:**
- Check browser console for errors
- Verify Lenis library is included in build
- Test on different browsers

### Issue: Workflow Fails

**Solution:**
- Check **Actions** tab for error details
- Verify `package-lock.json` is committed
- Ensure all dependencies are listed in `package.json`

## 🔄 Updating Your Site

1. **Make changes locally**
2. **Test locally:**
   ```bash
   npm run dev
   ```
3. **Commit and push:**
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```
4. **GitHub Actions will automatically redeploy**

## 🌐 Custom Domain (Optional)

To use a custom domain:

1. **Add CNAME file to `public/` directory:**
   ```
   yourdomain.com
   ```

2. **Configure DNS settings:**
   - Add A records pointing to GitHub Pages IPs
   - Or add CNAME record pointing to `YOUR_USERNAME.github.io`

3. **Update GitHub Pages settings:**
   - Go to **Settings** → **Pages**
   - Add your custom domain
   - Enable HTTPS

## 📊 Build Statistics

- **Build time:** ~30-60 seconds
- **Output size:** ~5-10 MB (optimized)
- **Pages generated:** All routes as static HTML
- **Assets:** Optimized and minified

## 🎨 Features Included in Build

- ✅ Swirl particle background (Canvas animation)
- ✅ Finisher header particles (Animated gradient)
- ✅ Smooth scrolling (Lenis library)
- ✅ Scroll progress indicator
- ✅ Scroll to top button
- ✅ Reveal animations on scroll
- ✅ Staggered course card animations
- ✅ Parallax header effect
- ✅ Responsive design

## 📝 Important Notes

1. **Base Path:** All links automatically prefixed with `/portfolio-4`
2. **Static Export:** No server-side features (API routes, server components)
3. **Image Optimization:** Disabled for static export compatibility
4. **.nojekyll:** Required to prevent GitHub from processing files

## 🚨 Before Deploying

- [ ] Test build locally: `npm run build`
- [ ] Check all animations work
- [ ] Verify responsive design
- [ ] Test on multiple browsers
- [ ] Commit all changes
- [ ] Update README if needed

## 📚 Additional Resources

- [Next.js Static Export Docs](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [GitHub Actions Docs](https://docs.github.com/en/actions)

---

**Your site will be live at:** `https://YOUR_USERNAME.github.io/portfolio-4/`

🎉 **Ready to deploy!**
