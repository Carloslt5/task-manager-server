import dotenv from 'dotenv'
import express from 'express'
import './db'
import config from './config'
import errorHandling from './error-handling'
import routes from './routes'

dotenv.config()

const app = express()

config(app)

app.use('/api', routes)

errorHandling(app)

export default app
