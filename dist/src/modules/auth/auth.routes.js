"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const checkEmailExist_1 = require("../../middleware/checkEmailExist");
const catchError_1 = require("../../middleware/catchError");
const auth_validation_1 = require("./auth.validation");
const validation_1 = require("../../middleware/validation");
exports.authRouter = (0, express_1.Router)();
exports.authRouter.post('/signup', (0, validation_1.validate)(auth_validation_1.signupSchemaVal), checkEmailExist_1.checkEmail, (0, catchError_1.catchError)(auth_controller_1.signUp));
exports.authRouter.post('/signin', (0, validation_1.validate)(auth_validation_1.signinSchemaVal), (0, catchError_1.catchError)(auth_controller_1.signin));
exports.authRouter.post('/refresh_token', (0, validation_1.validate)(auth_validation_1.refreshTokenVal), (0, catchError_1.catchError)(auth_controller_1.refreshTokenHandler));
