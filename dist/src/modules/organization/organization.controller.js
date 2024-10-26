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
exports.invite = exports.deleteOrg = exports.updateOrg = exports.getAllOrg = exports.getOrg = exports.addOrg = void 0;
const user_model_1 = require("../../../db/models/user.model");
const messages_1 = require("../../utils/common/messages");
const appError_1 = require("../../utils/appError");
const organization_model_1 = require("../../../db/models/organization.model");
const addOrg = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let exitOrg = yield organization_model_1.Organization.findOne({ name: req.body.name });
    if (exitOrg)
        return next(new appError_1.AppError(messages_1.messages.Organization.AlreadyExists, 409));
    req.body.owner = req.user.userId;
    let org = new organization_model_1.Organization(req.body);
    org.save();
    res.status(201).json({ message: messages_1.messages.Organization.CreatedSuccessfully, org: org._id });
});
exports.addOrg = addOrg;
const getOrg = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let orgs = yield organization_model_1.Organization.findById(req.params.id).populate({ path: "organization_members", select: 'name access_level _id' });
    res.json({ orgs });
});
exports.getOrg = getOrg;
const getAllOrg = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let orgs = yield organization_model_1.Organization.find().populate({ path: "organization_members", select: 'name access_level _id' });
    res.json({ orgs });
});
exports.getAllOrg = getAllOrg;
const updateOrg = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let orgs = yield organization_model_1.Organization.findByIdAndUpdate(req.params.id, req.body, { new: true });
    orgs || next(new appError_1.AppError(messages_1.messages.Organization.NotFound, 404));
    !orgs || res.json({ message: messages_1.messages.Organization.UpdatedSuccessfully, orgs });
});
exports.updateOrg = updateOrg;
const deleteOrg = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let orgs = yield organization_model_1.Organization.findByIdAndDelete(req.params.id, req.body);
    orgs || next(new appError_1.AppError(messages_1.messages.Organization.NotFound, 404));
    !orgs || res.json({ message: messages_1.messages.Organization.DeletedSuccessfully, orgs });
});
exports.deleteOrg = deleteOrg;
const invite = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield user_model_1.User.findOne({ email: req.body.user_email });
    if (!user)
        return next(new appError_1.AppError(messages_1.messages.User.NotFound, 404));
    user.Works_for = req.params.id;
    user.access_level = req.body.access_level || "worker";
    user.save();
    let org = yield organization_model_1.Organization.findByIdAndUpdate(req.params.id, { $push: { organization_members: user._id } }, { new: true });
    res.json({ message: messages_1.messages.User.InvitedSuccessfully, org });
});
exports.invite = invite;
