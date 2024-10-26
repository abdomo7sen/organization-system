import express from 'express'
import * as dotenv from "dotenv"

import { dbConnection } from './db/dbConnection'
import { authRouter } from './src/modules/auth/auth.routes'
import { globalError } from './src/middleware/globalError'
dbConnection()
const app = express()
const port = 3000
dotenv.config({path:'./config/.env'})
console.log(process.env.JWT_KEY);
app.use(express.json())

app.use("/auth",authRouter)

app.get('/', (req:any, res:any) => res.send('Hello World!'))
app.use(globalError)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))