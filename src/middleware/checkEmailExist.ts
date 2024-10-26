import { NextFunction, Request, Response } from "express"
import { AppError } from "../utils/appError.js"
import { messages } from "../utils/common/messages.js"
import { User } from "../../db/models/user.model.js"

export const checkEmail=async (req:Request,res:Response,next:NextFunction)=>{
    const user=await User.findOne({email:req.body.email})
    if(user) return next(new AppError(messages.email.AlreadyExists,400))
        
    return next()
}