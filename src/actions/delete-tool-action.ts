'use server'

import { revalidatePath } from 'next/cache'

import { db } from '@/lib/prisma'

type FormState = {
  message: string
}

export async function onRemoveToolAction(
  prevState: FormState,
  data: FormData
): Promise<FormState> {
  const formData = Object.fromEntries(data)

  try {
    const toolFounded = await db.tool.findUnique({
      where: {
        id: formData.id as string,
      },
    })

    if (toolFounded) {
      await db.tool.delete({
        where: {
          id: toolFounded.id,
        },
      })

      revalidatePath('/')
    }

    return {
      message: 'SUCCESS',
    }
  } catch (error) {
    console.log(error)
    return {
      message: 'An unexpected error occurred. Could not create tool.',
    }
  }
}
