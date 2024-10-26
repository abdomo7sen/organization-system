import { NextFunction, Request, Response } from "express"
import { AppError } from "../utils/appError"
import { messages } from "../utils/common/messages"
import jwt, { JwtPayload } from "jsonwebtoken"
import { User } from "../../db/models/user.model"

function breareToken(token:string){
    let newtoken =token.split(' ')[1]
    let decoded=jwt.verify(newtoken as string,process.env.ACCESS_KEY as string) as JwtPayload
    // return decoded
    return decoded
}


const protectedRoutes=async (req:any, res:any,next:NextFunction) => {
    let {token}=req.headers
    
    if(!token) return next(new AppError(messages.token.required,404))
    let userPayload= breareToken(token.toString())
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    if (userPayload?.exp && userPayload.exp<currentTime) {
      return next(new AppError(messages.token.Invalid,400))
    } 
    let user=await User.findById(userPayload.userId)
    if(!user) return next(new AppError(messages.User.NotFound,404))
        req.user=userPayload
       
        return next()

}

const allowedTo=(...roles:any)=>{
    return async (req:any,res:Response,next:NextFunction)=>{
        
        if(!roles.includes(req.user.role)){
            return next(new AppError(messages.User.userNotAuthorized,400))
        }
        return next()
    }
}


export { protectedRoutes,allowedTo }