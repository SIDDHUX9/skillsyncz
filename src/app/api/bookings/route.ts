import { NextRequest, NextResponse } from 'next/server'
import { DatabaseService } from '@/lib/db'
import { z } from 'zod'

const createBookingSchema = z.object({
  skill_id: z.string().uuid(),
  scheduled_at: z.string().datetime(),
  notes: z.string().optional(),
})

const updateBookingSchema = z.object({
  status: z.enum(['BOOKED', 'COMPLETED', 'CANCELLED']),
})

// GET /api/bookings - Get user's bookings
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    const bookings = await DatabaseService.getUserBookings(userId)
    
    return NextResponse.json({ bookings })
  } catch (error) {
    console.error('Get bookings error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/bookings - Create a new booking
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { skill_id, scheduled_at, notes } = createBookingSchema.parse(body)

    // For demo purposes, we'll use a hardcoded user ID
    // In a real app, you'd get this from the authenticated session
    const learner_id = "demo-user-id"

    // Get skill details to check availability and pricing
    const skill = await DatabaseService.getSkillById(skill_id)
    
    if (!skill) {
      return NextResponse.json(
        { error: 'Skill not found' },
        { status: 404 }
      )
    }

    // Check if user has enough credits
    const user = await DatabaseService.getUserById(learner_id)
    if (!user || user.credits < skill.price_credits) {
      return NextResponse.json(
        { error: 'Insufficient credits' },
        { status: 400 }
      )
    }

    // Create booking
    const booking = await DatabaseService.createBooking({
      skill_id,
      learner_id,
      instructor_id: skill.owner_id,
      start_time: scheduled_at,
      end_time: new Date(new Date(scheduled_at).getTime() + 60 * 60 * 1000).toISOString(), // +1 hour
      status: 'BOOKED',
      notes: notes || '',
    })

    // Deduct credits from learner
    await DatabaseService.updateUser(learner_id, {
      credits: user.credits - skill.price_credits
    })

    // Create credit transaction
    await DatabaseService.createCreditTransaction({
      user_id: learner_id,
      amount: -skill.price_credits,
      type: 'SPENT',
      ref_id: booking.id,
      message: `Booked skill: ${skill.title}`,
    })

    return NextResponse.json({
      message: 'Booking created successfully',
      booking
    })

  } catch (error) {
    console.error('Create booking error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/bookings - Update booking status
export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const bookingId = searchParams.get('id')

    if (!bookingId) {
      return NextResponse.json(
        { error: 'Booking ID is required' },
        { status: 400 }
      )
    }

    const body = await request.json()
    const { status } = updateBookingSchema.parse(body)

    const booking = await DatabaseService.updateBooking(bookingId, { status })

    // If booking is completed, add credits to instructor
    if (status === 'COMPLETED') {
      // Get booking details to find instructor and skill
      // This would need to be implemented in DatabaseService
      // For now, we'll skip the credit addition
    }

    return NextResponse.json({
      message: 'Booking updated successfully',
      booking
    })

  } catch (error) {
    console.error('Update booking error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}