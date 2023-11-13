import KanbanBoard from '../models/KanbanBoard.model'
import { StatusError } from './auth.controllers'
import { getKanbanBoard, getOneKanbanBoard } from './kanban.controllers'

jest.mock('../models/KanbanBoard.model.ts')

const res: any = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn()
}

const next = jest.fn()

describe('GET User Kanban Boards function', () => {
  const mockKanbanBoards = [
    {
      _id: 'KanbanBoardID1',
      title: 'Kanban 1',
      project: [
        { _id: 'ProjectID1', title: 'Project 1' },
        { _id: 'ProjectID2', title: 'Project 2' }
      ],
      owner: 'someUserID'
    },
    {
      _id: 'KanbanBoardID2',
      title: 'Kanban 2',
      project: [
        { _id: 'ProjectID3', title: 'Project 3' },
        { _id: 'ProjectID4', title: 'Project 4' }
      ],
      owner: 'someUserID'
    }
  ]

  const req: any = {
    payload: { _id: 'someUserID' }
  }

  it('should return User Kanban Board and respond with status 200', async () => {
    (KanbanBoard.find as jest.Mock).mockReturnValue({
      populate: jest.fn().mockResolvedValue(mockKanbanBoards)
    })
    await getKanbanBoard(req, res, next)

    expect(KanbanBoard.find).toHaveBeenCalledWith({ owner: 'someUserID' })
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith(mockKanbanBoards)
  })
  it('should handle KANBAN BOARDS NOT FOUND and respond with status 404', async () => {
    (KanbanBoard.find as jest.Mock).mockReturnValue({
      populate: jest.fn().mockResolvedValue(null)
    })
    await getKanbanBoard(req, res, next)

    expect(KanbanBoard.find).toHaveBeenCalledWith({ owner: 'someUserID' })
    expect(next).toHaveBeenCalledWith(new StatusError('Error: Can not found Boards', 404))
  })
})

describe('GET One Kanban Board', () => {
  const mockKanbanBoard = {
    _id: 'KanbanBoardID1',
    title: 'Kanban 1',
    project: [
      { _id: 'ProjectID1', title: 'Project 1' },
      { _id: 'ProjectID2', title: 'Project 2' }
    ],
    owner: 'someUserID'
  }

  const req: any = {
    params: {
      kanbanBoardId: 'KanbanBoardID1'
    }
  }

  it('should return One Kanban Board and respond with status 200', async () => {
    (KanbanBoard.findById as jest.Mock).mockReturnValue({
      populate: jest.fn().mockResolvedValue(mockKanbanBoard)
    })
    await getOneKanbanBoard(req, res, next)

    expect(KanbanBoard.findById).toHaveBeenCalledWith('KanbanBoardID1')
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith(mockKanbanBoard)
  })
})
