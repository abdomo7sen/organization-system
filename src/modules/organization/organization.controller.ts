import { User } from "../../../db/models/user.model"
import jwt, { JwtPayload } from "jsonwebtoken"
import * as dotenv from "dotenv"
import { messages } from "../../utils/common/messages"
import { AppError } from "../../utils/appError"
import { NextFunction, Request, Response } from "express"
import { Organization } from "../../../db/models/organization.model"

const addOrg=async(req:any, res:Response, next:NextFunction)=>{
    let exitOrg=await Organization.findOne({name:req.body.name})
    if(exitOrg) return next(new AppError(messages.Organization.AlreadyExists,409))
        req.body.owner=req.user.userId
    
        let org=new Organization(req.body)
    org.save()
    res.status(201).json({message:messages.Organization.CreatedSuccessfully,org:org._id})
}

const getOrg=async(req:any, res:Response, next:NextFunction)=>{

    let orgs=await Organization.findById(req.params.id).populate({path:"organization_members",select:'name access_level _id'});
    res.json({orgs})
}

const getAllOrg=async(req:any, res:Response, next:NextFunction)=>{
    let orgs=await Organization.find().populate({path:"organization_members",select:'name access_level _id'});
    res.json({orgs})

}
const updateOrg=async(req:any, res:Response, next:NextFunction)=>{

    let orgs=await Organization.findByIdAndUpdate(req.params.id,req.body,{new:true})

    orgs || next(new AppError(messages.Organization.NotFound,404))

    !orgs||res.json({message:messages.Organization.UpdatedSuccessfully,orgs})
}
const deleteOrg=async(req:any, res:Response, next:NextFunction)=>{

    let orgs=await Organization.findByIdAndDelete(req.params.id,req.body)

    orgs || next(new AppError(messages.Organization.NotFound,404))

    !orgs||res.json({message:messages.Organization.DeletedSuccessfully,orgs})
}
const invite=async(req:any, res:Response, next:NextFunction)=>{
        let user=await User.findOne({email:req.body.user_email})
        if(!user) return next(new AppError(messages.User.NotFound,404))
            user.Works_for=req.params.id
            user.access_level=req.body.access_level||"worker"
        user.save()
        let org=await Organization.findByIdAndUpdate(req.params.id,{$push:{organization_members:user._id}},{new:true})
        res.json({message:messages.User.InvitedSuccessfully,org})
}
export{
    addOrg,
    getOrg,
    getAllOrg,
    updateOrg,
    deleteOrg,
    invite
}