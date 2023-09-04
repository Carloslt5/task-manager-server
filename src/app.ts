import 'dotenv/config'
import express from 'express'
import config from './config'
import errorHandling from './error-handling'
import routes from './routes'
import './db'
import helmet from 'helmet'

const app = express()

config(app)

app.use(helmet())
app.use('/api', routes)

errorHandling(app)

export default app
