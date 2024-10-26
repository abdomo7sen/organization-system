import { connect } from "mongoose";
import * as dotenv from "dotenv"
dotenv.config({path:"./config/.env"})


export function dbConnection() {
    connect(process.env.MONGO_URI as string)
.then(()=>{
    console.log('Connected to MongoDB')
})
.catch((err)=>{
    console.log('Error connecting to MongoDB',err)
})
}