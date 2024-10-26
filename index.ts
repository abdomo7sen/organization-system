process.on("uncaughtException",(err)=>{
    console.log(err);
})
import cors from "cors"
import express from 'express'
import * as dotenv from "dotenv"
import { dbConnection } from './db/dbConnection'
import { authRouter } from './src/modules/auth/auth.routes'
import { globalError } from './src/middleware/globalError'
import { orgRouter } from './src/modules/organization/organization.routes'
dbConnection()
const app = express()
const port =process.env.PORT ||3000

app.use(cors())
dotenv.config({path:'./config/.env'})

app.use(express.json())

app.use("/auth",authRouter)
app.use("/organization",orgRouter)

app.get('/', (req:any, res:any) => res.send('Hello World!'))
app.use(globalError)
process.on("unhandledRejection",(err) => { console.log(err);})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))