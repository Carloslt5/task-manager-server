import { Schema, model, type ObjectId } from 'mongoose'

export interface IKanbanCard {
  boardId: ObjectId[]
  title: string
  order: number
  task: ObjectId[]
  archived: boolean
}

const kanbancardschema = new Schema(
  {
    boardId: {
      ref: 'Board',
      type: Schema.Types.ObjectId
    },
    title: {
      type: String,
      required: [true, 'Title is required.'],
      trim: true
    },
    order: {
      type: Number
    },
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
