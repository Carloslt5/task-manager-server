import dotenv from 'dotenv'
import express from 'express'
import config from './config'
import errorHandling from './error-handling'
import routes from './routes'
// import './db'

dotenv.config()
require('./db')

const app = express()

config(app)

app.use('/api', routes)

errorHandling(app)

export default app
