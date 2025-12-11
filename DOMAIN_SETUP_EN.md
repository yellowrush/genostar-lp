# Domain Setup Guide for www.genostar.jp

This document explains the necessary configuration changes to resolve the GitHub Pages site at `www.genostar.jp`.

## Code Changes Made

### 1. VitePress Configuration Update (`.vitepress/config.mts`)

**Change:**
```typescript
export default defineConfig({
  base: '/',  // Set to root path for custom domain
  // ...
});
```

**Reason:**
- By default, GitHub Pages serves sites at subpaths like `username.github.io/repository-name/`
- When using a custom domain (`www.genostar.jp`), the site is served at the root path `/`
- Setting `base: '/'` ensures all links, assets, and routing work correctly

### 2. CNAME File Creation (`public/CNAME`)

**Content:**
```
www.genostar.jp
```

**Reason:**
- GitHub Pages requires a CNAME file in the repository root or public directory to use a custom domain
- VitePress automatically copies contents of the `public` directory to the build output (`.vitepress/dist`)
- This file tells GitHub Pages to recognize and route the custom domain `www.genostar.jp`

### 3. GitHub Actions Workflow Update (`.github/workflows/deploy-pages.yml`)

**Change:**
```yaml
- name: Deploy to GitHub Pages (gh-pages branch)
  uses: peaceiris/actions-gh-pages@v3
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_dir: .vitepress/dist
    publish_branch: gh-pages
    cname: www.genostar.jp  # Added this line
```

**Reason:**
- Specifying the `cname` parameter ensures the CNAME file is preserved during deployment
- Acts as a fallback in case the CNAME file is lost during the build process

## Next Steps: GitHub and DNS Configuration

While the code changes are complete, additional configuration is required to make the domain functional:

### 4. GitHub Repository Settings

1. Go to repository **Settings** → **Pages**
2. Enter `www.genostar.jp` in the **Custom domain** field
3. Enable **Enforce HTTPS** (recommended)

### 5. DNS Configuration (at your domain registrar or DNS provider)

You need to add DNS records for the `genostar.jp` domain:

#### Option A: CNAME Record (Recommended)
```
www.genostar.jp  CNAME  yellowrush.github.io.
```

#### Option B: A Records (for apex domain support)
For the root domain (`genostar.jp`):
```
genostar.jp  A  185.199.108.153
genostar.jp  A  185.199.109.153
genostar.jp  A  185.199.110.153
genostar.jp  A  185.199.111.153
```

And CNAME for `www` subdomain:
```
www.genostar.jp  CNAME  yellowrush.github.io.
```

**Note:** DNS changes can take up to 24-48 hours to propagate fully.

## Verification

Once all settings are complete, verify with:

1. **Check DNS propagation:**
   ```bash
   nslookup www.genostar.jp
   # or
   dig www.genostar.jp
   ```

2. **Access the site:**
   - Visit `https://www.genostar.jp` in a browser
   - Verify all pages and assets load correctly

3. **Verify HTTPS:**
   - GitHub Pages automatically issues Let's Encrypt certificates
   - Certificate issuance may take a few minutes

## Troubleshooting

### 404 Error
- Verify correct branch (`gh-pages`) is selected in GitHub Pages settings
- Check CNAME file is deployed: `https://github.com/yellowrush/genostar-lp/blob/gh-pages/CNAME`

### DNS Not Resolving
- Verify DNS records are configured correctly
- Wait for DNS propagation (up to 48 hours)
- Use `nslookup` or `dig` to check DNS settings

### HTTPS Certificate Error
- Enable "Enforce HTTPS" in GitHub Pages settings
- Verify DNS is correctly configured
- Wait for certificate issuance (typically 5-10 minutes)

## Summary

Configuration status:

1. ✅ Code changes complete (VitePress config, CNAME file, workflow)
2. ⏳ GitHub Pages configuration required
3. ⏳ DNS configuration required
4. ✅ After setup, site accessible at `https://www.genostar.jp`

DNS configuration must be done in your domain provider's management console (e.g., Namecheap, GoDaddy, Route 53, etc.).
