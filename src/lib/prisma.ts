import type { GetToolsParams } from '@/@types/get-tools-params'
import type { ToolType } from '@/@types/Tool'
import type { UserType } from '@/@types/user-type'
import type { CreateToolSchemaType } from '@/validations/create-tool-schema'
import { currentUser } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'

export const db = new PrismaClient()

export const ToolService = {
  async create(tool: CreateToolSchemaType): Promise<void> {
    const user = await UserService.getUser()

    await db.tool.create({
      data: {
        ...tool,
        userId: user.id,
      },
    })
  },

  async update(toolId: string, tool: CreateToolSchemaType): Promise<void> {
    const user = await UserService.getUser()

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
  },

  async findById(toolId: string): Promise<ToolType> {
    const user = await UserService.getUser()

    const tool = await db.tool.findUniqueOrThrow({
      where: {
        id: toolId,
        AND: {
          userId: user.id,
        },
      },
    })

    return tool
  },

  async findAll(searchParams: GetToolsParams): Promise<ToolType[]> {
    const user = await UserService.getUser()

    const { name, hasTags } = searchParams

    if (hasTags) {
      const data = await db.tool.findMany({
        where: {
          userId: {
            equals: user.id,
          },
          AND: [
            {
              tags: {
                contains: name as string,
                mode: 'insensitive',
              },
            },
          ],
        },
      })

      return data
    }

    if (name) {
      const data = await db.tool.findMany({
        where: {
          userId: {
            equals: user.id,
          },
          AND: [
            {
              name: {
                contains: name as string,
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
  },

  async delete(toolId: string) {
    const user = await UserService.getUser()

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
  },
}

export const UserService = {
  async getUser(): Promise<UserType> {
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
  },
}
