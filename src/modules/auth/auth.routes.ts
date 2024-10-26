import { Router } from "express";
import { messages } from "../../utils/common/messages";
import { signin, signUp } from "./auth.controller";
import { checkEmail } from "../../middleware/checkEmailExist";
import { catchError } from "../../middleware/catchError";


export const authRouter=Router()

authRouter.post('/signup',checkEmail,catchError( signUp));
authRouter.post('/signin', signin);

