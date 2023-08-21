import { type ObjectId, Schema, model } from 'mongoose'

export interface IState {
  name: string
  project: ObjectId
}

const stateSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Title is required'],
      trim: true
    },
    project: [{
      ref: 'Project',
      type: Schema.Types.ObjectId
    }]
  },
  {
    timestamps: true
  }
)
const State = model<IState>('State', stateSchema)

export default State
