import { Schema, model } from 'mongoose'

export interface IState extends Document {
  _id: string
  stateName: string
}

const stateSchema = new Schema(
  {
    stateName: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    }
  },
  {
    timestamps: true
  }
)
const State = model<IState>('State', stateSchema)

export default State
