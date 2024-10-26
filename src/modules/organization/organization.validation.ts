import joi from "joi";
 const inviteVal=joi.object({
    user_email:joi.string().email().required(),
    id:joi.string().hex().required()
}).required()

 const addOrgVal=joi.object({
    name:joi.string().min(5).max(20).required(),
    description:joi.string().min(10).max(50).required(),
    token:joi.string().hex().required(),
    owner:joi.string().hex().required()
}).required()
 
 const getOrgVal=joi.object({
    token:joi.string().hex().required(),
    id:joi.string().hex().required()
}).required()
 const updateOrgVal=joi.object({
    name:joi.string().min(5).max(20).required(),
    description:joi.string().min(10).max(50).required(),
    token:joi.string().hex().required(),
    id:joi.string().hex().required()
}).required()
 const deleteOrgVal=joi.object({
    token:joi.string().hex().required(),
    id:joi.string().hex().required()
}).required()

export {
    inviteVal,
    addOrgVal,
    updateOrgVal,
    deleteOrgVal,
    getOrgVal
}