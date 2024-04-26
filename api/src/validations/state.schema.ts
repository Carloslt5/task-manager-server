// import { z } from 'zod';

// export const createStateSchema = z.object({
//   body: z.object({
//     stateName: z.string().min(3, 'State name requires a minimum of 3 characters'),
//   }),
//   params: z.object({
//     projectId: z.string(),
//   }),
// });

// export type StateBodyType = z.infer<typeof createStateSchema>['body'];
// export type StateParamsType = z.infer<typeof createStateSchema>['params'];
