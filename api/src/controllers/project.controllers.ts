import { RequestHandler } from 'express';

import { ProjectNotID } from '../interfaces/project.type';
import { projectmodel } from '../models/postgre-sql/project';

export const getUserProject: RequestHandler = async (req, res, next): Promise<void> => {
  const { id } = req.payload;

  try {
    const data = await projectmodel.findAll({ id });
    data.rowCount === null
      ? res.status(401).json({ status: false, message: 'Project not found' })
      : res.status(200).json({ status: true, message: 'Project found', data: data.rows });
  } catch (error) {
    next(error);
  }
};

export const getOneProject: RequestHandler = async (req, res, next): Promise<void> => {
  const { projectId } = req.params;

  try {
    const data = await projectmodel.findByID({ id: projectId });
    data.rowCount === 0
      ? res.status(404).json({ status: false, message: 'Project not found' })
      : res.status(200).json({ status: true, message: 'Project found', data: data.rows[0] });
  } catch (error) {
    next(error);
  }
};

export const createProject: RequestHandler = async (req, res, next): Promise<void> => {
  const { id } = req.payload;
  const input: ProjectNotID = req.body;

  try {
    const data = await projectmodel.create({ ...input, ownerID: id });
    data.rowCount === 0
      ? res.status(404).json({ status: false, message: 'Project not created' })
      : res.status(200).json({ status: true, message: 'Project created', data: data.rows[0] });
  } catch (error) {
    next(error);
  }
};
