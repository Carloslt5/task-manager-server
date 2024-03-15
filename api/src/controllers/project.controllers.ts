import { NextFunction, RequestHandler, Response } from 'express';
import { PayloadRequest } from '../middlewares/verifyToken.middleware';
import { projectmodel } from '../models/postgre-sql/project';
import { ProjectNotID } from '../schemas/project.type';

export const getUserProject = async (req: PayloadRequest, res: Response, next: NextFunction): Promise<void> => {
  const userID = req.payload!._id;

  try {
    const data = await projectmodel.findAll({ ownerID: userID });
    data.rowCount === 0
      ? res.status(401).json({ status: false, message: 'Project not found' })
      : res.status(200).json({ status: true, message: 'Project found', data: data.rows });
  } catch (error) {
    next(error);
  }
};

export const getOneProject: RequestHandler = async (req, res, next): Promise<void> => {
  const { projectId } = req.params;

  try {
    const data = await projectmodel.findByID(projectId);
    data.rowCount === 0
      ? res.status(404).json({ status: false, message: 'Project not found' })
      : res.status(200).json({ status: true, message: 'Project found', data: data.rows[0] });
  } catch (error) {
    next(error);
  }
};

export const createProject = async (req: PayloadRequest, res: Response, next: NextFunction): Promise<void> => {
  const userID = req.payload!._id;
  const input: ProjectNotID = req.body;

  try {
    const data = await projectmodel.create({ ...input, ownerID: userID });
    data.rowCount === 0
      ? res.status(200).json({ status: true, message: 'Project created' })
      : res.status(200).json({ status: true, message: 'Project created', data: data.rows[0] });
  } catch (error) {
    next(error);
  }
};

// const updateProject = async (
//   req: PayloadRequest<ProjectParamsType, unknown, ProjectBodyType>,
//   res: Response,
//   next: NextFunction,
// ): Promise<void> => {
//   const { projectId } = req.params;
//   const { title } = req.body;

//   try {
//     const project = await Project.findByIdAndUpdate(projectId, { title }, { new: true });
//     if (project === null) {
//       throw new StatusError('Error: Project can not edited', 422);
//     } else {
//       res.status(200).json({ project });
//     }
//   } catch (error) {
//     next(error);
//   }
// };

// const updateOrderSates = async (req: PayloadRequest, res: Response, next: NextFunction): Promise<void> => {
//   const { projectId } = req.params;
//   const { oldIndex, newIndex } = req.body;

//   try {
//     const projectFound = await Project.findById(projectId);
//     if (projectFound != null) {
//       const [movedState] = projectFound?.state.splice(oldIndex, 1);
//       projectFound?.state.splice(newIndex, 0, movedState);
//       const projectOrderState = await projectFound?.save();
//       res.status(200).json(projectOrderState);
//     }
//   } catch (error) {
//     next(error);
//   }
// };

// const deleteProject = async (
//   req: PayloadRequest<ProjectParamsType, unknown, unknown>,
//   res: Response,
//   next: NextFunction,
// ): Promise<void> => {
//   const { projectId } = req.params;

//   try {
//     const [project] = await Project.find({ _id: projectId });
//     const projectStateIDs = project.state.map((state) => state._id);
//     const tickets = await Ticket.find({ state: projectStateIDs });
//     const ticketIDs = tickets.map((ticket) => ticket._id);

//     await ToDo.deleteMany({ ticket: { $in: ticketIDs } });
//     await Ticket.deleteMany({ project: projectId });
//     await State.deleteMany({ _id: { $in: projectStateIDs } });
//     await Project.findByIdAndDelete({ _id: projectId });

//     res.status(200).json({ message: 'Project is deleted' });
//   } catch (error) {
//     next(error);
//   }
// };

// export { createProject, deleteProject, getOneProject, updateOrderSates, updateProject };
