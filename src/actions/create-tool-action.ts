'use server'

import { revalidatePath } from 'next/cache'
import { transformZodErrors } from '@/utils/transform-zod-errors'
import { createToolSchema } from '@/validations/create-tool-schema'
import { auth, currentUser } from '@clerk/nextjs/server'
import { z } from 'zod'

import { db } from '@/lib/prisma'

import { ZodErrors } from './../utils/transform-zod-errors'

type FormState = {
  error: boolean
  message: string | ZodErrors
}

export async function onSubmitAction(
  prevState: FormState,
  data: FormData
): Promise<FormState> {
  const formData = Object.fromEntries(data)
  const user = await currentUser()

  try {
    const parsed = createToolSchema.parse(formData)

    if (!user) {
      return {
        error: true,
        message: 'User not logged',
      }
    }

    const userFounded = await db.user.findUnique({
      where: {
        clerkId: user.id,
      },
    })

    if (!userFounded) {
      return {
        error: true,
        message: 'User not logged',
      }
    }

    await db.tool.create({
      data: {
        ...parsed,
        userId: userFounded.id,
      },
    })

    revalidatePath('/')

    return {
      error: false,
      message: 'SUCCESS',
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        error: true,
        message: transformZodErrors(error),
      }
    }

    console.log(error)

    return {
      error: true,
      message: 'An unexpected error occurred. Could not create tool.',
    }
  }
}
