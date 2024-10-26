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
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkEmail = void 0;
const appError_js_1 = require("../utils/appError.js");
const messages_js_1 = require("../utils/common/messages.js");
const user_model_js_1 = require("../../db/models/user.model.js");
const checkEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_js_1.User.findOne({ email: req.body.email });
    if (user)
        return next(new appError_js_1.AppError(messages_js_1.messages.email.AlreadyExists, 400));
    return next();
});
exports.checkEmail = checkEmail;
