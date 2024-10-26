"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenHandler = exports.signin = exports.signUp = void 0;
const user_model_1 = require("../../../db/models/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const messages_1 = require("../../utils/common/messages");
const appError_1 = require("../../utils/appError");
dotenv.config({ path: "./config/.env" });
// const signUp=async(req:Request,res:Response,next:NextFunction)=>{
//     const user= new User(req.body)
//     user.save()
//     let accessToken=jwt.sign({userId:user._id,email:user.email,role:user.role},process.env.ACCESS_KEY as string,{expiresIn:"12h"})
//     let refreshToken=jwt.sign({userId:user._id,email:user.email,role:user.role},process.env.REFRESH_KEY as string,{expiresIn:"7D"})
//     res.json({messages: messages.User.CreatedSuccessfully})
// }
const signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const objData = req.body;
    const user = new user_model_1.User(objData);
    let refreshToken = jsonwebtoken_1.default.sign({ userId: user._id, email: user.email, role: user.role }, process.env.REFRESH_KEY, { expiresIn: "7D" });
    user.refreshToken = refreshToken;
    yield user.save();
    let accessToken = jsonwebtoken_1.default.sign({ userId: user._id, email: user.email, role: user.role }, process.env.ACCESS_KEY, { expiresIn: "12h" });
    res.json({ messages: messages_1.messages.User.CreatedSuccessfully, accessToken });
});
exports.signUp = signUp;
const signin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email: req.body.email });
    if (!user)
        return next(new appError_1.AppError(messages_1.messages.User.NotFound, 404));
    if (user && bcrypt_1.default.compareSync(req.body.password, user.password)) {
        let accessToken = jsonwebtoken_1.default.sign({ userId: user._id, email: user.email, role: user.role }, process.env.ACCESS_KEY, { expiresIn: "12h" });
        let refreshToken = jsonwebtoken_1.default.sign({ userId: user._id, email: user.email, role: user.role }, process.env.REFRESH_KEY, { expiresIn: "7D" });
        res.status(200).json({ messages: messages_1.messages.User.userSignedInSuccessfully, accessToken, refreshToken });
    }
    else
        return next(new appError_1.AppError(messages_1.messages.password.emailOrPasswordIncorrect, 400));
});
exports.signin = signin;
const refreshTokenHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = jsonwebtoken_1.default.verify(req.body.refresh_token, process.env.REFRESH_KEY);
    console.log(decoded);
    const newAccessToken = jsonwebtoken_1.default.sign({ userId: decoded._id, email: decoded.email, role: decoded.role }, process.env.ACCESS_KEY, { expiresIn: "12h" });
    const newRefreshToken = jsonwebtoken_1.default.sign({ userId: decoded._id, email: decoded.email, role: decoded.role }, process.env.REFRESH_KEY, { expiresIn: "7D" });
    return res.status(200).json({
        access_token: newAccessToken,
        refresh_token: newRefreshToken,
    });
});
exports.refreshTokenHandler = refreshTokenHandler;
