
import dotenv from 'dotenv'
import express from 'express'
import './db'
import config from './config'
import errorHandling from './error-handling'

dotenv.config()

const app = express();

config(app)

const indexRoutes = require("./routes/index.routes");

app.use("/api", indexRoutes);

errorHandling(app)

export default app;
