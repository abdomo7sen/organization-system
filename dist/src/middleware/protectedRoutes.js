"use strict";
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
exports.allowedTo = exports.protectedRoutes = void 0;
const appError_1 = require("../utils/appError");
const messages_1 = require("../utils/common/messages");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../../db/models/user.model");
function breareToken(token) {
    let newtoken = token.split(' ')[1];
    let decoded = jsonwebtoken_1.default.verify(newtoken, process.env.ACCESS_KEY);
    // return decoded
    return decoded;
}
const protectedRoutes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { token } = req.headers;
    if (!token)
        return next(new appError_1.AppError(messages_1.messages.token.required, 404));
    let userPayload = breareToken(token.toString());
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    if ((userPayload === null || userPayload === void 0 ? void 0 : userPayload.exp) && userPayload.exp < currentTime) {
        return next(new appError_1.AppError(messages_1.messages.token.Invalid, 400));
    }
    let user = yield user_model_1.User.findById(userPayload.userId);
    if (!user)
        return next(new appError_1.AppError(messages_1.messages.User.NotFound, 404));
    req.user = userPayload;
    return next();
});
exports.protectedRoutes = protectedRoutes;
const allowedTo = (...roles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (!roles.includes(req.user.role)) {
            return next(new appError_1.AppError(messages_1.messages.User.userNotAuthorized, 400));
        }
        return next();
    });
};
exports.allowedTo = allowedTo;
