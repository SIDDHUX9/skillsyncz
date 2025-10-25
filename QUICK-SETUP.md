# 🚀 Quick Supabase Setup Instructions

## 📋 Step 1: Copy the Schema
Copy the SQL code from the file: `supabase-schema.txt`

## 📋 Step 2: Go to Supabase
1. Open: https://supabase.com/dashboard
2. Select your project: `objodaaunfznwdrhkuub`
3. Click **"SQL Editor"** in the left sidebar

## 📋 Step 3: Execute
1. Click **"New query"**
2. Paste the entire SQL code
3. Click **"Run"**

## 📋 Step 4: Test
Visit: `http://localhost:3000/api/test-supabase`
You should see: `"success": true`

## 🎯 What This Creates
- ✅ Users table (profiles, credits, karma)
- ✅ Skills table (listings, categories, pricing)
- ✅ Bookings table (sessions, time slots)
- ✅ Reviews table (ratings, comments)
- ✅ Community projects table
- ✅ Credit transactions table
- ✅ Security policies and indexes

## 🔐 Security Features
- Row Level Security (RLS) enabled
- Users can only access their own data
- Public read access for active skills

---

**After running this schema, your booking functionality will work perfectly!**