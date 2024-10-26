"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messages = exports.generalMessage = void 0;
const generalMessage = (entity) => ({
    CreatedSuccessfully: `${entity} created successfully`,
    UpdatedSuccessfully: `${entity} updated successfully`,
    DeletedSuccessfully: `${entity} deleted successfully`,
    CreatedFailed: `Failed to create ${entity}`,
    UpdatedFailed: `Failed to update ${entity}`,
    DeletedFailed: `Failed to delete ${entity}`,
    NotFound: `${entity} not found`,
    AlreadyExists: `${entity} already exists`,
    Success: `Success `,
    Invalid: `Invalid `,
    Apply: `Applied successfully `,
    Added: `item Added successfully`,
    stock: `item quantity is greater than available`
});
exports.generalMessage = generalMessage;
exports.messages = {
    User: Object.assign(Object.assign({}, (0, exports.generalMessage)("user")), { userSignedInSuccessfully: "User signed in", accountVerifiedSuccessfully: "Account verified successfully", mustLogin: "User must login", userNotAuthorized: "User is not authorized", InvitedSuccessfully: "User invited" }),
    password: Object.assign(Object.assign({}, (0, exports.generalMessage)("password")), { passwordsNotMatch: "rePassword does not match", emailOrPasswordIncorrect: "email or password is incorrect" }),
    token: Object.assign(Object.assign({}, (0, exports.generalMessage)("token")), { invalidToken: "invalidToken", required: "token is required", invalidBearerKey: "invalidBearerKey", invalidPayload: "invalidPayload" }),
    email: Object.assign(Object.assign({}, (0, exports.generalMessage)("email")), { emailNotExists: "Email not exists", emailNotVerified: "Email not verified", accountsFound: "Accounts found" }),
    Organization: Object.assign({}, (0, exports.generalMessage)("Organization")),
};
