# 🚀 Quick Deploy to GitHub Pages

## ⚡ 5-Minute Deployment

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com/new)
2. Create repository named: `portfolio-4`
3. Don't add README, .gitignore, or license (we have them)

### Step 2: Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# First commit
git commit -m "Initial commit - Ready for deployment"

# Set main branch
git branch -M main

# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/portfolio-4.git

# Push to GitHub
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. That's it! 🎉

### Step 4: Wait for Deployment

- Go to **Actions** tab
- Watch the "Deploy to GitHub Pages" workflow run
- Wait ~2-3 minutes for completion
- Look for green checkmark ✅

### Step 5: Visit Your Site

Your site will be live at:
```
https://YOUR_USERNAME.github.io/portfolio-4/
```

---

## ✅ What's Already Configured

- ✅ Next.js static export enabled
- ✅ Base path set to `/portfolio-4`
- ✅ GitHub Actions workflow created
- ✅ Build optimization configured
- ✅ All animations working
- ✅ Smooth scrolling enabled

---

## 🔄 Updating Your Site

**Make changes → Commit → Push → Auto-deploys!**

```bash
# Make your changes
git add .
git commit -m "Update content"
git push origin main

# GitHub Actions will automatically rebuild and redeploy
```

---

## 🎨 What's Included

Your deployed site includes:
- ✨ Swirl particle background animation
- ✨ Finisher header with colorful particles
- ✨ Buttery smooth scrolling (Lenis)
- ✨ Scroll progress indicator
- ✨ Scroll to top button
- ✨ Reveal animations
- ✨ Responsive design

---

## 🐛 Quick Troubleshooting

**Build fails?**
- Check the Actions tab for error details
- Ensure all dependencies are in package.json

**404 error?**
- Verify GitHub Pages is set to "GitHub Actions"
- Check basePath in next.config.js matches `/portfolio-4`

**Assets not loading?**
- Clear browser cache
- Check browser console for errors

---

## 📚 Need More Details?

See `docs/DEPLOYMENT.md` for complete documentation.

---

**That's it! Your site is ready to deploy! 🚀**
