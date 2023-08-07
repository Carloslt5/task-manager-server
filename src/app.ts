import dotenv from 'dotenv'
import express from 'express'
import config from './config'
import errorHandling from './error-handling'
import routes from './routes'
import dbInit from './db'

dotenv.config()

dbInit()

const app = express()

config(app)

app.use('/api', routes)

errorHandling(app)

export default app
