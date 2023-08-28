import { type ObjectId, Schema, model } from 'mongoose'

export interface ITicket {
  title: string
  completed: boolean
  projectId: ObjectId
  state: ObjectId
  owner: ObjectId
}

const ticketSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true
    },
    completed: {
      type: Boolean,
      default: false
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: 'Project'
    },
    state: {
      type: Schema.Types.ObjectId,
      ref: 'State'
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
)
const Ticket = model<ITicket>('Ticket', ticketSchema)

export default Ticket
