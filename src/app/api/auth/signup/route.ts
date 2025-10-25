import { NextRequest, NextResponse } from 'next/server'
import { DatabaseService } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { v4 as uuidv4 } from 'uuid'

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, name } = signupSchema.parse(body)

    // Check if user already exists
    const existingUser = await DatabaseService.getUserByEmail(email)

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await DatabaseService.createUser({
      email,
      name,
      credits: 100,
      karma: 0,
      is_id_verified: false,
    })

    // Create welcome credit transaction
    await DatabaseService.createCreditTransaction({
      user_id: user.id,
      amount: 100,
      type: 'EARNED',
      message: 'Welcome bonus! Start learning and sharing skills.',
    })

    return NextResponse.json({
      message: 'User created successfully',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        credits: user.credits,
        karma: user.karma,
        created_at: user.created_at,
      }
    })

  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}