import type { GetToolsParams } from '@/@types/get-tools-params'
import type { ToolType } from '@/@types/Tool'
import type { UserType } from '@/@types/user-type'
import type { CreateToolSchemaType } from '@/validations/create-tool-schema'
import { currentUser } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'

export const db = new PrismaClient()

export async function getUser(): Promise<UserType> {
  const user = await currentUser()

  if (!user) {
    throw Error('User not logged')
  }

  const userFounded = await db.user.findUnique({
    where: {
      clerkId: user.id,
    },
  })

  if (!userFounded) {
    throw Error('User not founded')
  }

  return userFounded
}

export async function createTool(tool: CreateToolSchemaType): Promise<void> {
  const user = await getUser()

  await db.tool.create({
    data: {
      ...tool,
      userId: user.id,
    },
  })
}

export async function updateToolFromId(
  toolId: string,
  tool: CreateToolSchemaType
): Promise<void> {
  const user = await getUser()

  await db.tool.update({
    where: {
      id: toolId,
      AND: [
        {
          userId: user.id,
        },
      ],
    },
    data: {
      ...tool,
    },
  })
}

export async function getToolFromId(toolId: string): Promise<ToolType> {
  const user = await getUser()

  const tool = await db.tool.findUniqueOrThrow({
    where: {
      id: toolId,
      AND: {
        userId: user.id,
      },
    },
  })

  return tool
}

export async function getTools(
  searchParams: GetToolsParams
): Promise<ToolType[]> {
  const user = await getUser()

  if (searchParams.name) {
    const data = await db.tool.findMany({
      where: {
        userId: {
          equals: user.id,
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
  }

  const data = await db.tool.findMany({
    where: {
      userId: user.id,
    },
  })

  return data
}

export async function deleteToolFromId(toolId: string) {
  const user = await getUser()

  const toolFounded = await db.tool.findUnique({
    where: {
      id: toolId,
      AND: {
        userId: user.id,
      },
    },
  })

  if (!toolFounded) {
    throw Error('Tool not founded')
  }

  await db.tool.delete({
    where: {
      id: toolFounded.id,
    },
  })
}
