"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenVal = exports.signinSchemaVal = exports.signupSchemaVal = void 0;
const joi_1 = __importDefault(require("joi"));
const signupSchemaVal = joi_1.default.object({
    name: joi_1.default.string().min(2).max(20),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(8).pattern(/^[A-z][A-Za-z0-9]{8,40}$/).required(),
    Works_for: joi_1.default.string().required(),
    access_level: joi_1.default.string().required(),
    role: joi_1.default.string()
}).required();
exports.signupSchemaVal = signupSchemaVal;
const signinSchemaVal = joi_1.default.object({
    email: joi_1.default.string().email(),
    password: joi_1.default.string().min(8).pattern(/^[A-z][A-Za-z0-9]{8,40}$/).required(),
    token: joi_1.default.string().hex().required()
}).required();
exports.signinSchemaVal = signinSchemaVal;
const refreshTokenVal = {
    refresh_token: joi_1.default.string().hex().required()
};
exports.refreshTokenVal = refreshTokenVal;
