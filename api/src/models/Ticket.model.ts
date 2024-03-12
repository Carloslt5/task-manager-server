import { type ObjectId, Schema, model } from 'mongoose';
import { type IProject } from './Project.model';
import { type IState } from './State.model';

enum Priority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
}

export interface ITicket extends Document {
  title: string;
  projectId: IProject;
  description: string;
  state: IState;
  priority: Priority;
  owner: ObjectId;
}

const ticketSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
    },
    state: {
      type: Schema.Types.ObjectId,
      ref: 'State',
    },
    priority: {
      type: String,
      enum: [Priority.LOW, Priority.MEDIUM, Priority.HIGH],
      default: Priority.LOW,
      required: [true, 'Priority is required'],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);
const Ticket = model<ITicket>('Ticket', ticketSchema);

export default Ticket;
