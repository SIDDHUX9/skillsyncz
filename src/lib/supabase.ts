import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing required Supabase environment variables. Please check SUPABASE_URL and SUPABASE_ANON_KEY.')
}

// Client for browser-side operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Client for server-side operations (with elevated privileges)
export const supabaseAdmin = createClient(
  supabaseUrl!,
  supabaseServiceKey!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

// Database types (keep the rest of your existing types...)
export interface Database {
  // ... keep all your existing database types
}
