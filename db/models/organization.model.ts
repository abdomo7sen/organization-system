import { model, Schema, Types } from "mongoose";


const ORGANIZATION_COLLECTION_NAME ="ORGANIZATION"
const schema:Schema<any>=new Schema({

    name:{type:String,
        required:[true,"name is required"],
        minlength:[3,"name should be at least 3 characters long"],
        maxlength:[50,"name should be at most 50 characters long"],
        unique:true,
        trim:true,
        lowercase:true,
        index:true,
    },
    description:{type:String,
        required:[true,"description is required"],
        minlength:[10,"description should be at least 10 characters long"],
        maxlength:[500,"description should be at most 500 characters long"]
    },
    organization_members:[{
        type:Types.ObjectId,
        ref:"User",
    }]
},{timestamps:true,versionKey:false})

export const Organization=model(ORGANIZATION_COLLECTION_NAME,schema);