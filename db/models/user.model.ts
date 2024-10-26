import { model, Schema, Types } from "mongoose";
import bcrypt from "bcrypt"


const USER_COLLECTION_NAME ="User"
const schema:Schema<any>=new Schema({

    name:{type:String,
        required:[true,"name is required"],
        minlength:3,
        maxlength:20
    },
    
    email:{type:String,
        required:[true,"email is required"],
        unique:true,

    },
    password:{type:String,
        required:[true,"password is required"],
        minlength:8
    },
    role:{type:String,
        enum:["owner","user"],
        default:"user"
    },
    refreshToken:{type:String},
    Works_for:{type:Types.ObjectId},
    access_level:{type:String}
},{timestamps:true,versionKey:false})
schema.pre('save',function () {
    this.password=bcrypt.hashSync(this.password as string,8)
})
export const User=model(USER_COLLECTION_NAME,schema);