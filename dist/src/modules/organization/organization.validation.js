"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrgVal = exports.deleteOrgVal = exports.updateOrgVal = exports.addOrgVal = exports.inviteVal = void 0;
const joi_1 = __importDefault(require("joi"));
const inviteVal = joi_1.default.object({
    user_email: joi_1.default.string().email().required(),
    id: joi_1.default.string().hex().required()
}).required();
exports.inviteVal = inviteVal;
const addOrgVal = joi_1.default.object({
    name: joi_1.default.string().min(5).max(20).required(),
    description: joi_1.default.string().min(10).max(50).required(),
    token: joi_1.default.string().hex().required(),
    owner: joi_1.default.string().hex().required()
}).required();
exports.addOrgVal = addOrgVal;
const getOrgVal = joi_1.default.object({
    token: joi_1.default.string().hex().required(),
    id: joi_1.default.string().hex().required()
}).required();
exports.getOrgVal = getOrgVal;
const updateOrgVal = joi_1.default.object({
    name: joi_1.default.string().min(5).max(20).required(),
    description: joi_1.default.string().min(10).max(50).required(),
    token: joi_1.default.string().hex().required(),
    id: joi_1.default.string().hex().required()
}).required();
exports.updateOrgVal = updateOrgVal;
const deleteOrgVal = joi_1.default.object({
    token: joi_1.default.string().hex().required(),
    id: joi_1.default.string().hex().required()
}).required();
exports.deleteOrgVal = deleteOrgVal;
