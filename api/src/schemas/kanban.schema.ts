import { z } from 'zod';

export const createKanbanSchema = z.object({
  body: z.object({
    title: z.string().min(5, 'Title requires a minimum of 5 characters').trim(),
  }),
});

export const kanbanSchema = z.object({
  body: z.object({
    title: z.string().min(5, 'Title requires a minimum of 5 characters').trim(),
  }),
  params: z.object({
    kanbanBoardId: z.string(),
  }),
});

export const addProjectToKanbanSchema = z.object({
  body: z.object({
    projectId: z.string().trim(),
  }),
});

export type KanbanParamsType = z.infer<typeof kanbanSchema>['params'];
export type KanbanBodyType = z.infer<typeof kanbanSchema>['body'];
export type AddProjectToKanbanBodyType = z.infer<typeof addProjectToKanbanSchema>['body'];
