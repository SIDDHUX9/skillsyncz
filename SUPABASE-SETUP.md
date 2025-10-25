# 🚀 Supabase Setup Guide for SkillSwap Platform

## 📋 Prerequisites
- You have a Supabase account and project
- Your Supabase URL and keys are configured in `.env.local`

## 🔧 Step 1: Set up Database Schema

### Option A: Using Supabase Dashboard (Recommended)
1. Go to your Supabase project dashboard
2. Click on "SQL Editor" in the left sidebar
3. Copy and paste the entire contents of `supabase-schema.sql` file
4. Click "Run" to execute the schema

### Option B: Using Supabase CLI
```bash
# Install Supabase CLI if you haven't already
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref objodaaunfznwdrhkuub

# Push the schema
supabase db push
```

## 🔧 Step 2: Verify Setup

After setting up the schema, test the connection by visiting:
```
http://localhost:3000/api/test-supabase
```

You should see a success message like:
```json
{
  "success": true,
  "message": "Supabase connection successful!",
  "data": {"count": 0},
  "env": {
    "url": "✅ Set",
    "anonKey": "✅ Set", 
    "serviceKey": "✅ Set"
  }
}
```

## 🔧 Step 3: Test User Registration

1. Go to http://localhost:3000
2. Click on "Sign In" → "Sign Up"
3. Create a test account
4. Verify you can sign in successfully

## 🔧 Step 4: Test Booking Functionality

1. Browse to http://localhost:3000/skills
2. Click on any skill
3. Click "Book Session"
4. Verify the booking works without errors

## 🛠️ Troubleshooting

### Error: "Could not find the table 'public.users'"
**Solution**: The database schema hasn't been set up yet. Follow Step 1 above.

### Error: "supabaseKey is required"
**Solution**: Environment variables are not properly loaded. Check your `.env.local` file.

### Error: "Invalid API key"
**Solution**: Verify your Supabase keys are correct in the `.env.local` file.

## 📊 Schema Overview

The following tables will be created:
- `users` - User profiles and authentication
- `skills` - Skill listings
- `bookings` - Session bookings
- `reviews` - User reviews and ratings
- `community_projects` - Community projects
- `credit_txns` - Credit transactions
- `project_volunteers` - Project volunteers

## 🔐 Security Notes

- Row Level Security (RLS) is enabled on all tables
- Users can only access their own data
- Public read access is enabled for active skills and projects

## 🎯 Next Steps

Once setup is complete:
1. Test all functionality works properly
2. Deploy to Vercel following the `DEPLOYMENT-SUMMARY.md` guide
3. Configure custom domain and branding

---

**Need Help?** Check the `DEPLOYMENT-SUMMARY.md` file for detailed deployment instructions.