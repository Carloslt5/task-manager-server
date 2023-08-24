import { type ObjectId, Schema, model } from 'mongoose'

export interface IState {
  name: string
  project: ObjectId
}

const stateSchema = new Schema(
  {
    stateName: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },
    ticket: [{
      type: Schema.Types.ObjectId,
      ref: 'Task'
    }]
  },
  {
    timestamps: true
  }
)
const State = model<IState>('State', stateSchema)

export default State
