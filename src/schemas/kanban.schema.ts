import { z } from 'zod'

export const kanbanSchema = z.object({
  body: z.object({
    title: z.string().min(5, 'Title requires a minimum of 5 characters').trim()
  })
})
export type KanbanDataType = z.infer<typeof kanbanSchema>['body']
