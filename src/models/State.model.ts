import { Schema, model } from 'mongoose'
import { type ITicket } from './Ticket.model'

export interface IState {
  stateName: string
  ticket: ITicket[]
}

const stateSchema = new Schema(
  {
    stateName: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    }
    // ticket: [{
    //   type: Schema.Types.ObjectId,
    //   ref: 'Task'
    // }]
  },
  {
    timestamps: true
  }
)
const State = model<IState>('State', stateSchema)

export default State
