import { Router } from "express";
import { messages } from "../../utils/common/messages";
import { checkEmail } from "../../middleware/checkEmailExist";
import { catchError } from "../../middleware/catchError";
import { addOrg, deleteOrg, getAllOrg, getOrg, invite, updateOrg } from "./organization.controller";
import { allowedTo, protectedRoutes } from "../../middleware/protectedRoutes";
import { validate } from "../../middleware/validation";
import { addOrgVal, deleteOrgVal, getOrgVal, inviteVal, updateOrgVal } from "./organization.validation";


export const orgRouter=Router()

orgRouter.post('/',validate(addOrgVal),protectedRoutes,allowedTo("owner"),catchError( addOrg));
orgRouter.get('/',protectedRoutes,catchError( getAllOrg));

orgRouter.get('/:id',validate(getOrgVal),protectedRoutes,catchError( getOrg));
orgRouter.put('/:id',validate(updateOrgVal),protectedRoutes,allowedTo("owner"),catchError( updateOrg));
orgRouter.delete('/:id',validate(deleteOrgVal),protectedRoutes,allowedTo("owner"),catchError( deleteOrg));


orgRouter.post('/:id/invite',validate(inviteVal),protectedRoutes,catchError( invite));


