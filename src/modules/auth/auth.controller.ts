import { User } from "../../../db/models/user.model"
import jwt from "jsonwebtoken"
import * as dotenv from "dotenv"
import bcrypt from "bcrypt"
import { messages } from "../../utils/common/messages"
import { AppError } from "../../utils/appError"
import { NextFunction, Request, Response } from "express"
import { Organization } from "../../../db/models/organization.model"

dotenv.config({path:"./config/.env"})

const signUp=async(req:Request,res:Response,next:NextFunction)=>{
    const objData=req.body;
    const user = new User(objData) ;

    let refreshToken=jwt.sign({userId:user._id,email:user.email,role:user.role},process.env.REFRESH_KEY as string,{expiresIn:"7D"})
    user.refreshToken = refreshToken ; 
    await user.save();
    const org=await Organization.findById(req.body.Works_for)
    if (!org) return next(new AppError(messages.Organization.NotFound, 404));//+
        else {//+
            (org.organization_members as Array<string>).push(user._id as string);//+
            org.save()
        }//

    let accessToken=jwt.sign({userId:user._id,email:user.email,role:user.role},process.env.ACCESS_KEY as string,{expiresIn:"12h"})
    res.json({messages: messages.User.CreatedSuccessfully,accessToken})
}

const signin=async(req:Request,res:Response,next:NextFunction)=>{
    const user=await User.findOne({email:req.body.email})
    if(!user) return next(new AppError(messages.User.NotFound,404))
    if(user&&bcrypt.compareSync(req.body.password,user.password as string)){
        let accessToken=jwt.sign({userId:user._id,email:user.email,role:user.role},process.env.ACCESS_KEY as string,{expiresIn:"12h"})
        let refreshToken=jwt.sign({userId:user._id,email:user.email,role:user.role},process.env.REFRESH_KEY as string,{expiresIn:"7D"})
        res.status(200).json({messages: messages.User.userSignedInSuccessfully,accessToken,refreshToken})
    }
    else return next(new AppError(messages.password.emailOrPasswordIncorrect,400))
};

const refreshTokenHandler =async(req:Request,res:Response,next:NextFunction)=>{

        const decoded = jwt.verify(req.body.refresh_token, process.env.REFRESH_KEY as string) as jwt.JwtPayload ;
        console.log(decoded);
        
        const newAccessToken =jwt.sign({userId:decoded._id,email:decoded.email,role:decoded.role},process.env.ACCESS_KEY as string,{expiresIn:"12h"})

        const newRefreshToken =jwt.sign({userId:decoded._id,email:decoded.email,role:decoded.role},process.env.REFRESH_KEY as string,{expiresIn:"7D"})

        return res.status(200).json({
            access_token: newAccessToken,
            refresh_token: newRefreshToken,
          });
    
}

export{
    signUp,
    signin,
    refreshTokenHandler
}

