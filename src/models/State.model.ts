import { type ObjectId, Schema, model } from 'mongoose'

export interface IState {
  name: string
  project: ObjectId
}

const stateSchema = new Schema(
  {
    stateName: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      unique: true
    },
    project: [{
      ref: 'Project',
      type: Schema.Types.ObjectId
    }],
    order: {
      type: Number
    }
  },
  {
    timestamps: true
  }
)
const State = model<IState>('State', stateSchema)

export default State
