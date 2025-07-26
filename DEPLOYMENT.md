# Deploying PomodoroTodo to Vercel

## Quick Deploy

The easiest way to deploy this project to Vercel is to use the Vercel CLI or connect your GitHub repository.

### Option 1: Vercel CLI (Recommended)

1. Install Vercel CLI globally:
```bash
npm install -g vercel
```

2. Login to your Vercel account:
```bash
vercel login
```

3. Deploy from the project root:
```bash
vercel
```

4. Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N** (for first deployment)
   - What's your project's name? **pomodoro-todo** (or your preferred name)
   - In which directory is your code located? **./** 
   - Want to override the settings? **N** (the vercel.json will handle this)

### Option 2: GitHub Integration

1. Push your code to a GitHub repository:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/pomodoro-todo.git
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will automatically detect it's a Vite project and configure the build settings

### Option 3: Drag and Drop

1. Build the project locally:
```bash
npm run build
```

2. Go to [vercel.com](https://vercel.com) and sign in
3. Drag and drop the `dist` folder to the Vercel dashboard

## Build Configuration

The project includes a `vercel.json` file with the following configuration:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This ensures:
- Proper build command execution
- Correct output directory mapping
- SPA routing support (all routes redirect to index.html)
- Vite framework detection

## Environment Variables

This project doesn't require any environment variables for basic functionality, as it uses localStorage for data persistence.

## Custom Domain (Optional)

After deployment, you can add a custom domain in your Vercel dashboard:
1. Go to your project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions

## Automatic Deployments

When using GitHub integration, Vercel will automatically deploy:
- **Production**: Every push to the `main` branch
- **Preview**: Every push to other branches and pull requests

## Performance Optimizations

The app is already optimized for production with:
- Code splitting and lazy loading
- Optimized bundle size with Vite
- Efficient CSS with Tailwind's purging
- Compressed assets and modern JavaScript

Your app should achieve excellent Lighthouse scores on Vercel's edge network!