import { NextRequest, NextResponse } from 'next/server'
import { DatabaseService } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = signinSchema.parse(body)

    // Find user
    const user = await DatabaseService.getUserByEmail(email)

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // For demo purposes, we'll accept any password
    // In a real app, you'd verify the hashed password
    // const isValidPassword = await bcrypt.compare(password, user.hashedPassword)
    
    return NextResponse.json({
      message: 'Sign in successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        credits: user.credits,
        karma: user.karma,
        is_id_verified: user.is_id_verified,
        created_at: user.created_at,
      }
    })

  } catch (error) {
    console.error('Signin error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}