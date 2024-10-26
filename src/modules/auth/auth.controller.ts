import { User } from "../../../db/models/user.model"
import jwt from "jsonwebtoken"
import * as dotenv from "dotenv"
import bcrypt from "bcrypt"
import { messages } from "../../utils/common/messages"
import { AppError } from "../../utils/appError"
import { NextFunction, Request, Response } from "express"

dotenv.config({path:"./config/.env"})
console.log(process.env.JWT_KEY);

const signUp=async(req:Request,res:Response,next:NextFunction)=>{
    const user= new User(req.body)
    
    user.save()
    let token=jwt.sign({userId:user._id,email:user.email,role:user.role},process.env.JWT_KEY as string)
    res.json({messages: messages.User.CreatedSuccessfully,token})
}



const signin=async(req:Request,res:Response,next:NextFunction)=>{
    const user=await User.findOne({email:req.body.email})
    if(!user) return next(new AppError(messages.User.NotFound,404))
    if(user&&bcrypt.compareSync(req.body.password,user.password as string)){
        let token=jwt.sign({userId:user._id,email:user.email,role:user.role},process.env.JWT_KEY as string)
        res.status(200).json({messages: messages.User.userSignedInSuccessfully,token})
    }
    else return next(new AppError(messages.password.emailOrPasswordIncorrect,400))
};


export{
    signUp,
    signin
}