'use server'
import { z } from 'zod'

const createTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/[a-z-]/, { message: 'must be lower case letters or dashes' }),
  description: z.string().min(10),
})

interface CreateTopicFormState {
  errors: {
    name?: string[]
    description?: string[]
  }
}

export async function CreateTopic(
  formState: CreateTopicFormState,
  formData: FormData
): Promise<CreateTopicFormState> {
  const result = createTopicSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
  })

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors }
  }
  return { errors: {} }

  //TODO: Revalidate the HomePage
}
