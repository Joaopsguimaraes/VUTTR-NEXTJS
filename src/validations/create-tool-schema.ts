import { z } from 'zod'

export const createToolSchema = z.object({
  name: z
    .string({
      required_error: 'O titulo deve ser obrigatório',
    })
    .min(2, {
      message: 'O titulo deve haver no mínimo 3 caracteres',
    }),
  url: z
    .string({
      required_error: 'A url deve ser obrigatória',
    })
    .min(3, {
      message: 'A url deve haver no mínimo 3 caracteres',
    }),
  description: z
    .string({
      required_error: 'Descrição deve ser obrigatória',
    })
    .min(3, {
      message: 'A descrição deve haver no mínimo 3 caracteres',
    }),
  tags: z.string(),
})

export type CreateToolSchemaType = z.infer<typeof createToolSchema>
