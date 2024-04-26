import { z } from 'zod';

const projectProperties = {
  title: z.string().min(5, 'Title requires a minimum of 5 characters').trim(),
  description: z.string().min(15, 'Description requires a minimum of 15 characters').trim(),
};

export const createProjectSchema = z.object({
  body: z.object({
    ...projectProperties,
  }),
});
