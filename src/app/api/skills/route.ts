import { NextRequest, NextResponse } from 'next/server'
import { DatabaseService } from '@/lib/db'
import { z } from 'zod'

const createSkillSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  category: z.enum(['ACADEMIC', 'ARTS', 'BUSINESS', 'COOKING', 'FITNESS', 'LANGUAGE', 'MUSIC', 'TECH', 'TRADES', 'OTHER']),
  price_credits: z.number().min(0),
  lat: z.number(),
  lng: z.number(),
  owner_id: z.string().uuid(),
})

// GET /api/skills - Get all skills
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const lat = searchParams.get('lat')
    const lng = searchParams.get('lng')
    const radius = searchParams.get('radius')
    const limit = searchParams.get('limit')

    const filters: any = {}
    
    if (category && category !== 'all') {
      filters.category = category.toUpperCase()
    }
    
    if (lat && lng) {
      filters.lat = parseFloat(lat)
      filters.lng = parseFloat(lng)
    }
    
    if (radius) {
      filters.radius = parseFloat(radius)
    }
    
    if (limit) {
      filters.limit = parseInt(limit)
    }

    const skills = await DatabaseService.getSkills(filters)
    
    return NextResponse.json({ skills })
  } catch (error) {
    console.error('Get skills error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/skills - Create a new skill
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const skillData = createSkillSchema.parse(body)

    const skill = await DatabaseService.createSkill(skillData)
    
    return NextResponse.json({
      message: 'Skill created successfully',
      skill
    })
  } catch (error) {
    console.error('Create skill error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}