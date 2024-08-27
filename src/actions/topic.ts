'use server'
import { z } from 'zod'
import { auth } from '@/auth'

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
    _form?: string[]
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

  const session = await auth()
  if (!session || !session.user) {
    return {
      errors: {
        _form: ['You must be logged in to create a topic'],
      },
    }
  }
  return { errors: {} }

  //TODO: Revalidate the HomePage
}
