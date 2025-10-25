import { NextRequest, NextResponse } from 'next/server'
import { DatabaseService } from '@/lib/db'
import { z } from 'zod'

const createProjectSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  max_volunteers: z.number().min(1),
})

export async function GET(request: NextRequest) {
  try {
    const projects = await DatabaseService.getProjects()

    // Add currentVolunteers count and isFull status
    const projectsWithCounts = projects.map(project => ({
      ...project,
      current_volunteers: project.volunteers?.length || 0,
      is_full: (project.volunteers?.length || 0) >= project.max_volunteers,
    }))

    return NextResponse.json({ projects: projectsWithCounts })

  } catch (error) {
    console.error('Get projects error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, max_volunteers } = createProjectSchema.parse(body)

    // For demo purposes, we'll use a hardcoded user ID
    // In a real app, you'd get this from the authenticated session
    const creator_id = "demo-user-id"

    const project = await DatabaseService.createProject({
      creator_id,
      title,
      description,
      max_volunteers,
    })

    return NextResponse.json({
      message: 'Project created successfully',
      project
    })

  } catch (error) {
    console.error('Create project error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}