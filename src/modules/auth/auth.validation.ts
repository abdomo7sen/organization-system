import joi, { Schema } from "joi";
 const signupSchemaVal:Schema<any>=joi.object({
    name:joi.string().min(2).max(20),
    email:joi.string().email().required(),
    password:joi.string().min(8).pattern(/^[A-z][A-Za-z0-9]{8,40}$/).required(),
    Works_for:joi.string().required(),
    access_level:joi.string().required(),
    role:joi.string()
}).required()

 const signinSchemaVal:Schema<any>=joi.object({
    email:joi.string().email(),
    password:joi.string().min(8).pattern(/^[A-z][A-Za-z0-9]{8,40}$/).required(),
    token:joi.string().hex().required()
}).required()

const refreshTokenVal ={
    refresh_token:joi.string().hex().required()

}
export {
    signupSchemaVal,
    signinSchemaVal,
    refreshTokenVal
 
}