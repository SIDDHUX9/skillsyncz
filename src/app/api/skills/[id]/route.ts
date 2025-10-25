import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { data: skill, error } = await supabaseAdmin
      .from('skills')
      .select(`
        *,
        owner:profiles(name, avatar_url, is_id_verified),
        _count:reviews(count)
      `)
      .eq('id', params.id)
      .eq('is_active', true)
      .single()

    if (error || !skill) {
      return NextResponse.json(
        { error: 'Skill not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ skill })
  } catch (error) {
    console.error('Skill fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch skill' },
      { status: 500 }
    )
  }
}