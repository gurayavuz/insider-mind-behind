# 🚀 Deploying to Vercel

This guide will help you deploy the Cargo Tracking API to Vercel.

## Prerequisites

1. A [Vercel account](https://vercel.com/signup) (free tier is fine)
2. [Vercel CLI](https://vercel.com/docs/cli) installed (optional but recommended)
3. Git repository (recommended)

---

## Method 1: Deploy via Vercel CLI (Recommended)

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Deploy

From your project directory:

```bash
vercel
```

Follow the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Select your account
- **Link to existing project?** → No
- **Project name?** → trackorder-api (or your preferred name)
- **Directory?** → ./ (current directory)
- **Override settings?** → No

### Step 4: Deploy to Production

```bash
vercel --prod
```

Your API will be live at: `https://your-project-name.vercel.app`

---

## Method 2: Deploy via GitHub

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Step 2: Import to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Other
   - **Root Directory**: ./
   - **Build Command**: (leave empty)
   - **Output Directory**: (leave empty)
5. Click **"Deploy"**

---

## Method 3: Deploy via Vercel Dashboard (No CLI)

### Step 1: Prepare Your Code

Make sure all files are ready in your project directory.

### Step 2: Deploy

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Choose **"Import Git Repository"** or drag and drop your project folder
4. Click **"Deploy"**

---

## Testing Your Deployed API

Once deployed, your API will be available at:

```
https://your-project-name.vercel.app
```

### Test Endpoints

Replace `your-project-name` with your actual Vercel project URL:

```bash
# Root endpoint
curl https://your-project-name.vercel.app/

# Track cargo
curl https://your-project-name.vercel.app/api/track?code=CARGO123

# Health check
curl https://your-project-name.vercel.app/health
```

---

## Environment Variables (Optional)

If you need to add environment variables:

### Via CLI:
```bash
vercel env add VARIABLE_NAME
```

### Via Dashboard:
1. Go to your project settings
2. Navigate to **"Environment Variables"**
3. Add your variables

---

## Custom Domain (Optional)

### Add a Custom Domain

1. Go to your project in Vercel Dashboard
2. Click **"Settings"** → **"Domains"**
3. Add your custom domain
4. Follow the DNS configuration instructions

---

## Project Structure for Vercel

The project is configured with:

```
trackorder/
├── api/              # Serverless functions
│   ├── index.ts      # Root endpoint
│   ├── track.ts      # Track cargo endpoint
│   ├── health.ts     # Health check
│   └── types.ts      # Shared types
├── src/              # Local development (Express)
├── vercel.json       # Vercel configuration
└── package.json      # Dependencies
```

---

## Vercel Configuration

The `vercel.json` file configures:
- **Builds**: TypeScript files in the `api/` folder
- **Routes**: URL mappings to serverless functions
- **CORS**: Enabled for all origins

---

## Local Testing (Before Deploy)

To test locally with Vercel environment:

```bash
# Install dependencies
npm install

# Test with Vercel dev server
vercel dev
```

Or use the Express version:

```bash
npm run dev
```

---

## Troubleshooting

### Build Fails

- Make sure `@vercel/node` is in `package.json`
- Check that TypeScript is properly configured
- Verify `vercel.json` syntax

### 404 Errors

- Check route configurations in `vercel.json`
- Ensure function names match file names

### CORS Issues

- CORS headers are set in each function
- If issues persist, check browser console for specific errors

---

## Monitoring & Logs

View logs in real-time:

```bash
vercel logs
```

Or check the Vercel Dashboard:
1. Go to your project
2. Click on **"Deployments"**
3. Select a deployment to view logs

---

## Updating Your API

### Via CLI:
```bash
# Make your changes
git add .
git commit -m "Update API"

# Deploy
vercel --prod
```

### Via Git Integration:
Just push to your main branch:
```bash
git push origin main
```

Vercel will automatically deploy.

---

## Cost

- **Free Tier**: 100 GB bandwidth, unlimited deployments
- Perfect for testing and small projects
- See [Vercel Pricing](https://vercel.com/pricing) for details

---

## Using in Integration Actions

Once deployed, update your Integration Action configuration:

**URL**: `https://your-project-name.vercel.app/api/track`  
**Method**: GET  
**Query Params**: 
- Key: `code`
- Value: `CARGO123` (or dynamic variable)

---

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Community](https://github.com/vercel/vercel/discussions)

---

**Happy Deploying! 🎉**

