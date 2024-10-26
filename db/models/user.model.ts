import { model, Schema } from "mongoose";
import bcrypt from "bcrypt"


const USER_COLLECTION_NAME ="User"
const schema:Schema<any>=new Schema({

    name:{type:String},
    email:String,
    password:String,
    role:{type:String,
        enum:["admin","user"],
        default:"user"
    }
})
schema.pre('save',function () {
    this.password=bcrypt.hashSync(this.password as string,8)
})
export const User=model(USER_COLLECTION_NAME,schema);