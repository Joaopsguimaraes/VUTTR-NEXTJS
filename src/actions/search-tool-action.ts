'use server'

import { revalidatePath } from 'next/cache'
import type { ZodErrors } from '@/utils/transform-zod-errors'

import { db } from '@/lib/prisma'

type FormState = {
  error: boolean
  message: string | ZodErrors
}

export async function searchToolAction(prevState: FormState, data: FormData) {
  const formData = Object.fromEntries(data)

  try {
    const result = await db.tool.findMany({
      where: {
        name: formData.name as string,
      },
    })

    revalidatePath('/')
  } catch (error) {}
}
