export type Project = {
  id: string;
  title: string;
  description: string;
  ownerID: string;
  projectId: string;
};

export type ProjectID = Pick<Project, 'id'>;
export type ProjectNotID = Omit<Project, 'id'>;
