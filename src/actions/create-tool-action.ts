'use server'

import { revalidatePath } from 'next/cache'
import { transformZodErrors } from '@/utils/transform-zod-errors'
import { createToolSchema } from '@/validations/create-tool-schema'
import { z } from 'zod'

import { ToolService } from '@/lib/prisma'

import { ZodErrors } from './../utils/transform-zod-errors'

type CreateToolFormState = {
  error: boolean
  message: string | ZodErrors
}

export async function onCreateToolAction(
  _: CreateToolFormState,
  data: FormData
): Promise<CreateToolFormState> {
  const formData = Object.fromEntries(data)

  try {
    const parsed = createToolSchema.parse(formData)

    await ToolService.create(parsed)

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
