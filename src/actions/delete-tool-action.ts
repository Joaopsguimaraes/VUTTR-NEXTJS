'use server'

import { revalidatePath } from 'next/cache'

import { deleteToolFromId } from '@/lib/prisma'

type DeleteToolFormState = {
  message: string
}

export async function onRemoveToolAction(
  _: DeleteToolFormState,
  data: FormData
): Promise<DeleteToolFormState> {
  const formData = Object.fromEntries(data)

  try {
    await deleteToolFromId(formData.id as string)

    revalidatePath('/')
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
