# 🧹 How to Clean Up and Reset Your Supabase Database

## 🚨 **Important: This will DELETE all existing data!**

## 📋 Step 1: Clean Up Existing Tables
1. Copy the SQL code from `cleanup-database.sql`
2. Go to your Supabase SQL Editor
3. Paste and run the cleanup script
4. You should see: "All tables and types dropped successfully!"

## 📋 Step 2: Create Fresh Tables
1. Copy the SQL code from `supabase-schema.txt`
2. Paste and run the main schema
3. You should see "Success" for all table creations

## 📋 Step 3: Test
Visit: `http://localhost:3000/api/test-supabase`
You should see: `"success": true`

---

## ⚠️ **Alternative: Keep Existing Data**

If you want to keep existing data, you can run individual table updates instead:

```sql
-- Just update the skills table structure
ALTER TABLE skills ADD COLUMN IF NOT EXISTS lat DOUBLE PRECISION;
ALTER TABLE skills ADD COLUMN IF NOT EXISTS lng DOUBLE PRECISION;
-- etc.
```

---

**Recommendation: Use the cleanup script for a fresh start!**