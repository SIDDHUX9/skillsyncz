# Vercel Deployment Guide for SkillSwap Platform

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Push your code to GitHub
3. **Supabase Project**: Set up with the provided schema

## Step 1: Set Up Supabase Database

1. Go to your Supabase project dashboard
2. Navigate to the **SQL Editor**
3. Copy and paste the entire contents of `supabase-schema.sql`
4. Click **Run** to execute the schema
5. Verify all tables are created in the **Table Editor**

## Step 2: Configure Environment Variables on Vercel

1. Go to your Vercel dashboard
2. Select your project (or import from GitHub)
3. Go to **Settings** → **Environment Variables**
4. Add the following environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://objodaaunfznwdrhkuub.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9iam9kYWF1bmZ6bndkcmhrdXViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzODc0OTEsImV4cCI6MjA3Njk2MzQ5MX0.geirSs3_yLgtJhFfAv2HEEndcc-xfvoLoNPJs0JWTuI
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9iam9kYWF1bmZ6bndkcmhrdXViIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTM4NzQ5MSwiZXhwIjoyMDc2OTYzNDkxfQ.oVPmuxqdzHGQkZWFIlse9XoflwHFnapP-X5gKp3bfHM
NEXTAUTH_SECRET=your-secure-secret-key-here
NEXTAUTH_URL=https://your-domain.vercel.app
```

**Important**: Generate a secure `NEXTAUTH_SECRET` using:
```bash
openssl rand -base64 32
```

## Step 3: Deploy to Vercel

### Option A: Through Vercel Dashboard (Recommended)

1. Click **"Add New..."** → **"Project"**
2. Import your GitHub repository
3. Vercel will automatically detect Next.js
4. Configure build settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`
5. Add environment variables (if not added earlier)
6. Click **"Deploy"**

### Option B: Using Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy from your project directory:
   ```bash
   vercel --prod
   ```

4. Follow the prompts to configure your project

## Step 4: Post-Deployment Configuration

### 1. Update Supabase CORS Settings

1. Go to your Supabase project
2. Navigate to **Settings** → **API**
3. Scroll down to **Additional Settings**
4. Add your Vercel domain to **CORS allowed origins**
5. Example: `https://your-domain.vercel.app`

### 2. Configure Custom Domain (Optional)

1. In Vercel dashboard, go to **Settings** → **Domains**
2. Add your custom domain
3. Update DNS records as instructed
4. Update `NEXTAUTH_URL` environment variable

### 3. Test the Application

1. Visit your deployed application
2. Test user registration and login
3. Verify database operations work correctly
4. Check all 3D features and animations

## Step 5: Monitor and Maintain

### Vercel Analytics

1. Go to **Analytics** tab in Vercel dashboard
2. Monitor performance, usage, and errors
3. Set up alerts for critical issues

### Supabase Monitoring

1. Monitor database usage in Supabase dashboard
2. Check API usage and performance
3. Set up backups and monitoring

## Troubleshooting

### Common Issues

1. **Build Errors**:
   - Check `npm run build` works locally
   - Verify all dependencies are installed
   - Check environment variables

2. **Database Connection Issues**:
   - Verify Supabase URL and keys
   - Check RLS policies in Supabase
   - Ensure CORS is configured

3. **Authentication Issues**:
   - Verify NEXTAUTH_SECRET is set
   - Check NEXTAUTH_URL matches your domain
   - Ensure cookies are working properly

### Debug Mode

Add debug environment variable:
```
DEBUG=*
```

### Logs

- **Vercel**: Check **Functions** tab for execution logs
- **Supabase**: Check **Logs** tab for database operations

## Performance Optimization

### 1. Enable Edge Functions

For API routes that need low latency:
```javascript
// Add to the top of your API route
export const runtime = 'edge'
```

### 2. Optimize Images

Use Next.js Image component for all images:
```jsx
import Image from 'next/image'
```

### 3. Enable Caching

Add caching headers for static assets:
```javascript
// In vercel.json
"headers": [
  {
    "source": "/_next/static/(.*)",
    "headers": [
      {
        "key": "Cache-Control",
        "value": "public, max-age=31536000, immutable"
      }
    ]
  }
]
```

## Security Considerations

1. **Environment Variables**: Never commit sensitive data
2. **Database Access**: Use RLS policies in Supabase
3. **API Security**: Implement rate limiting
4. **HTTPS**: Ensure all traffic uses HTTPS
5. **Dependencies**: Keep packages updated

## Scaling Considerations

1. **Database**: Monitor Supabase usage and upgrade as needed
2. **CDN**: Vercel provides global CDN automatically
3. **Serverless Functions**: Scale automatically with Vercel
4. **Monitoring**: Set up alerts for performance metrics

## Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)

## Quick Deployment Checklist

- [ ] Supabase schema executed
- [ ] Environment variables configured
- [ ] Build succeeds locally
- [ ] CORS settings updated
- [ ] Custom domain configured (if needed)
- [ ] Authentication tested
- [ ] Database operations tested
- [ ] 3D features working
- [ ] Mobile responsiveness checked
- [ ] Performance monitoring set up