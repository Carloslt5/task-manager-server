import { z } from 'zod'

export const createToDoSchema = z.object({
  body: z.object({
    ticketID: z.string(),
    newTodo: z.object({
      title: z.string().min(2, 'Title requires a minimum of 2 characters').trim()
    })
  }),
  params: z.object({
    id: z.string()
  })
})

export type ToDoBodyType = z.infer<typeof createToDoSchema>['body']
