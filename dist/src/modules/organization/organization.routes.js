"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orgRouter = void 0;
const express_1 = require("express");
const catchError_1 = require("../../middleware/catchError");
const organization_controller_1 = require("./organization.controller");
const protectedRoutes_1 = require("../../middleware/protectedRoutes");
const validation_1 = require("../../middleware/validation");
const organization_validation_1 = require("./organization.validation");
exports.orgRouter = (0, express_1.Router)();
exports.orgRouter.post('/', (0, validation_1.validate)(organization_validation_1.addOrgVal), protectedRoutes_1.protectedRoutes, (0, protectedRoutes_1.allowedTo)("owner"), (0, catchError_1.catchError)(organization_controller_1.addOrg));
exports.orgRouter.get('/', protectedRoutes_1.protectedRoutes, (0, catchError_1.catchError)(organization_controller_1.getAllOrg));
exports.orgRouter.get('/:id', (0, validation_1.validate)(organization_validation_1.getOrgVal), protectedRoutes_1.protectedRoutes, (0, catchError_1.catchError)(organization_controller_1.getOrg));
exports.orgRouter.put('/:id', (0, validation_1.validate)(organization_validation_1.updateOrgVal), protectedRoutes_1.protectedRoutes, (0, protectedRoutes_1.allowedTo)("owner"), (0, catchError_1.catchError)(organization_controller_1.updateOrg));
exports.orgRouter.delete('/:id', (0, validation_1.validate)(organization_validation_1.deleteOrgVal), protectedRoutes_1.protectedRoutes, (0, protectedRoutes_1.allowedTo)("owner"), (0, catchError_1.catchError)(organization_controller_1.deleteOrg));
exports.orgRouter.post('/:id/invite', (0, validation_1.validate)(organization_validation_1.inviteVal), protectedRoutes_1.protectedRoutes, (0, catchError_1.catchError)(organization_controller_1.invite));
