import { auth, currentUser } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'

export const db = new PrismaClient()

type GetToolsParams = {
  [key: string]: string | string[] | undefined
}

export async function getTools(searchParams: GetToolsParams) {
  const user = await currentUser()

  if (!user) {
    return []
  }

  const userFounded = await db.user.findUnique({
    where: {
      clerkId: user.id,
    },
  })

  if (!userFounded) {
    return []
  }

  if (searchParams.name) {
    const data = await db.tool.findMany({
      where: {
        userId: {
          equals: userFounded.id,
        },
        AND: [
          {
            name: {
              contains: searchParams.name as string,
              mode: 'insensitive',
            },
          },
        ],
      },
    })

    return data
  } else {
    const data = await db.tool.findMany({
      where: {
        userId: userFounded.id,
      },
    })

    return data
  }
}
