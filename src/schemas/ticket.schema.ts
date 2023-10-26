import { z } from 'zod'

export const ticketSchema = z.object({
  body: z.object({
    title: z.string().min(5, 'Title requires a minimum of 5 characters').trim(),
    description: z.string().min(15, 'Description requires a minimum of 15 characters').trim(),
    priority: z.string()
  })
})

export const paramsTicketSchema = z.object({
  params: z.object({
    ticketID: z.string()
  })
})

export type TicketParamsType = z.infer<typeof paramsTicketSchema>['params']
export type TicketBodyType = z.infer<typeof ticketSchema>['body']
