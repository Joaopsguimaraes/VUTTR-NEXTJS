'use server'

import { revalidatePath } from 'next/cache'
import { transformZodErrors } from '@/utils/transform-zod-errors'
import { editToolSchema } from '@/validations/edit-tool-schema'
import { z } from 'zod'

import { updateToolFromId } from '@/lib/prisma'

import { ZodErrors } from '../utils/transform-zod-errors'

type EditToolFormState = {
  error: boolean
  message: string | ZodErrors
}

export async function onUpdateToolAction(
  _: EditToolFormState,
  data: FormData
): Promise<EditToolFormState> {
  const formData = Object.fromEntries(data)

  try {
    const toolParsed = editToolSchema.parse(formData)

    await updateToolFromId(toolParsed.id, toolParsed)

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
