import { NextResponse } from 'next/server'
import { auth, currentUser } from '@clerk/nextjs/server'

import { db } from '@/lib/prisma'

export async function GET() {
  const { userId } = auth()

  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const user = await currentUser()
  if (!user) {
    return new NextResponse('User not exist', { status: 404 })
  }

  let dbUser = await db.user.findUnique({
    where: { clerkId: user.id },
  })

  if (!dbUser) {
    dbUser = await db.user.create({
      data: {
        clerkId: user.id,
        name: user.firstName ?? '',
        lastName: user.lastName ?? '',
        email: user.emailAddresses[0].emailAddress ?? '',
      },
    })
  }

  if (!dbUser) {
    return new NextResponse(null, {
      status: 302, // 302 Found - temporary redirect
    })
  }

  return new NextResponse(null, {
    status: 302,
    headers: {
      Location: 'http://localhost:3000/pt',
    },
  })
}
