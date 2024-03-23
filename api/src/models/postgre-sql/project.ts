import { Pool, QueryResult } from 'pg';
import { dbConfig } from '../../db';
import { Project, ProjectID, ProjectNotID } from '../../schemas/project.type';

const db = new Pool(dbConfig);

class ProjectModel {
  async findAll({ userID }: { userID: string }): Promise<QueryResult<Project[]>> {
    return db.query('SELECT * FROM project WHERE "ownerID" = $1', [userID]);
  }

  async findByID(projectId: ProjectID): Promise<QueryResult<Project[]>> {
    return db.query('SELECT * FROM project WHERE id = $1', [projectId]);
  }

  async create({ title, description, ownerID }: ProjectNotID): Promise<QueryResult<Project[]>> {
    const projectID = crypto.randomUUID();
    return db.query(
      `
    INSERT INTO project (id, title, description, "ownerID")
    VALUES ($1, $2, $3, $4) RETURNING *`,
      [projectID, title, description, ownerID],
    );
  }
}

export const projectmodel = new ProjectModel();
