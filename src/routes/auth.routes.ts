import express from 'express'

const router = express.Router()

router.get('/', (req, res, next) => {
  res.json('All good AUTH')
})

export default router
