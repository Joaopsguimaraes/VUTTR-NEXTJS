import { PrismaClient } from '@prisma/client'

export const db = new PrismaClient()

type GetToolsParams = {
  [key: string]: string | string[] | undefined
}

export async function getTools(searchParams: GetToolsParams) {
  if (searchParams.name) {
    const data = await db.tool.findMany({
      where: {
        OR: [
          {
            name: {
              contains: searchParams.name as string,
              mode: 'insensitive',
            },
          },
        ],
      },
      orderBy: {
        name: 'asc',
      },
    })

    return data
  } else {
    const data = await db.tool.findMany()

    return data
  }
}
