import { Schema, model, type ObjectId } from 'mongoose'

export interface IKanbanCard {
  title: string
  order: number
  task: ObjectId[]
  archived: boolean
}

const kanbancardschema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required.'],
      trim: true
    },
    order: Number,
    task: [{
      ref: 'ToDo',
      type: Schema.Types.ObjectId
    }],
    archived: {
      type: Boolean,
      default: false
    }
  }
)

const KanbanCard = model<IKanbanCard>('KanbanCard', kanbancardschema)

export default KanbanCard
