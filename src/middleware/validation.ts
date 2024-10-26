import { AppError } from "../utils/appError.js";

export const validate=(schema:any)=>{

    return(req:any,res:any,next:any)=>{
    const {error}=schema.validate({...req.body,...req.params,...req.query},{abortEarly:false});
    if(!error){
        return next();
    
    }else {
    let msg = error.details.map((element: { message: string }) => element.message);
    
    return next(new AppError(msg,404))
    }
}
}