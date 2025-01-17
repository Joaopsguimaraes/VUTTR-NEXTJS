'use server'

import { revalidatePath } from 'next/cache'
import { transformZodErrors } from '@/utils/transform-zod-errors'
import { createToolSchema } from '@/validations/create-tool-schema'
import { editToolSchema } from '@/validations/edit-tool-schema'
import { z } from 'zod'

import { db } from '@/lib/prisma'

import { ZodErrors } from './../utils/transform-zod-errors'

type FormState = {
  error: boolean
  message: string | ZodErrors
}

export async function onEditToolAction(
  prevState: FormState,
  data: FormData
): Promise<FormState> {
  const formData = Object.fromEntries(data)

  try {
    const parsed = editToolSchema.parse(formData)

    await db.tool.update({
      where: {
        id: parsed.id,
      },
      data: {
        ...parsed,
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
