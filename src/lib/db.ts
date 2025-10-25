import { supabase, supabaseAdmin, Database } from '@/lib/supabase'

// Database helper functions for Supabase
export class DatabaseService {
  // User operations
  static async createUser(userData: Database['public']['Tables']['users']['Insert']) {
    const { data, error } = await supabaseAdmin
      .from('users')
      .insert(userData)
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  static async getUserByEmail(email: string) {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('email', email)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    return data
  }

  static async getUserById(id: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    return data
  }

  static async getAllUsers() {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('id, email, name, credits, karma, is_id_verified, created_at')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  }

  static async updateUser(id: string, userData: Database['public']['Tables']['users']['Update']) {
    const { data, error } = await supabase
      .from('users')
      .update(userData)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  // Skill operations
  static async createSkill(skillData: Database['public']['Tables']['skills']['Insert']) {
    const { data, error } = await supabaseAdmin
      .from('skills')
      .insert(skillData)
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  static async getSkills(filters?: {
    category?: string
    lat?: number
    lng?: number
    radius?: number
    limit?: number
  }) {
    let query = supabase
      .from('skills')
      .select(`
        *,
        owner:users (
          id,
          name,
          avatar_url,
          karma,
          is_id_verified
        )
      `)
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (filters?.category) {
      query = query.eq('category', filters.category)
    }

    if (filters?.limit) {
      query = query.limit(filters.limit)
    }

    const { data, error } = await query
    
    if (error) throw error
    return data
  }

  static async getSkillById(id: string) {
    const { data, error } = await supabase
      .from('skills')
      .select(`
        *,
        owner:users (
          id,
          name,
          avatar_url,
          karma,
          is_id_verified
        )
      `)
      .eq('id', id)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    return data
  }

  static async updateSkill(id: string, skillData: Database['public']['Tables']['skills']['Update']) {
    const { data, error } = await supabase
      .from('skills')
      .update(skillData)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  // Booking operations
  static async createBooking(bookingData: Database['public']['Tables']['bookings']['Insert']) {
    const { data, error } = await supabaseAdmin
      .from('bookings')
      .insert(bookingData)
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  static async getUserBookings(userId: string) {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        skill:skills (
          id,
          title,
          category,
          price_credits,
          owner:users (
            id,
            name,
            avatar_url
          )
        )
      `)
      .eq('learner_id', userId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  }

  static async updateBooking(id: string, bookingData: Database['public']['Tables']['bookings']['Update']) {
    const { data, error } = await supabase
      .from('bookings')
      .update(bookingData)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  // Review operations
  static async createReview(reviewData: Database['public']['Tables']['reviews']['Insert']) {
    const { data, error } = await supabaseAdmin
      .from('reviews')
      .insert(reviewData)
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  static async getSkillReviews(skillId: string) {
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        *,
        reviewer:users (
          id,
          name,
          avatar_url
        )
      `)
      .eq('skill_id', skillId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  }

  // Credit transaction operations
  static async createCreditTransaction(txnData: Database['public']['Tables']['credit_txns']['Insert']) {
    const { data, error } = await supabaseAdmin
      .from('credit_txns')
      .insert(txnData)
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  static async getUserCreditTransactions(userId: string) {
    const { data, error } = await supabase
      .from('credit_txns')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  }

  // Community project operations
  static async createProject(projectData: Database['public']['Tables']['community_projects']['Insert']) {
    const { data, error } = await supabaseAdmin
      .from('community_projects')
      .insert(projectData)
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  static async getProjects() {
    const { data, error } = await supabase
      .from('community_projects')
      .select(`
        *,
        creator:users (
          id,
          name,
          avatar_url
        ),
        volunteers:project_volunteers (
          id,
          user_id,
          joined_at,
          user:users (
            id,
            name,
            avatar_url
          )
        )
      `)
      .eq('is_active', true)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  }

  static async joinProject(projectId: string, userId: string) {
    const { data, error } = await supabaseAdmin
      .from('project_volunteers')
      .insert({
        project_id: projectId,
        user_id: userId
      })
      .select()
      .single()
    
    if (error) throw error
    return data
  }
}

// Export the database service as default
export default DatabaseService