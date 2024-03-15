import { z } from 'zod';
const projectID = {
  projectId: z.string(),
};
const projectProperties = {
  title: z.string().min(5, 'Title requires a minimum of 5 characters').trim(),
  description: z.string().min(15, 'Description requires a minimum of 15 characters').trim(),
  ownerID: z.string(),
};

export const createProjectSchema = z.object({
  body: z.object({
    ...projectProperties,
  }),
});

export const ProjectSchema = z.object({ ...projectID, ...projectProperties });
export type Project = z.infer<typeof ProjectSchema>;
export type ProjectID = z.infer<typeof ProjectSchema>['projectId'];
export type ProjectNotID = Omit<Project, 'projectId'>;
