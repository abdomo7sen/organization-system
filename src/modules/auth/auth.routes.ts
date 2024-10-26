import { Router } from "express";
import { messages } from "../../utils/common/messages";
import { refreshTokenHandler, signin, signUp } from "./auth.controller";
import { checkEmail } from "../../middleware/checkEmailExist";
import { catchError } from "../../middleware/catchError";
import { refreshTokenVal, signinSchemaVal, signupSchemaVal } from "./auth.validation";
import { validate } from "../../middleware/validation";


export const authRouter=Router()

authRouter.post('/signup',validate(signupSchemaVal),checkEmail,catchError( signUp));
authRouter.post('/signin',validate(signinSchemaVal) ,catchError(signin));
authRouter.post('/refresh_token',validate(refreshTokenVal) ,catchError(refreshTokenHandler));

