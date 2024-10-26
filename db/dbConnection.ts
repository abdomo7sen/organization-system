import { connect } from "mongoose";


export function dbConnection() {
    connect('mongodb://127.0.0.1:27017/organization-system')
.then(()=>{
    console.log('Connected to MongoDB')
})
.catch((err)=>{
    console.log('Error connecting to MongoDB',err)
})
}