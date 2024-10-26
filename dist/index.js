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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
process.on("uncaughtException", (err) => {
    console.log(err);
});
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
const dbConnection_1 = require("./db/dbConnection");
const auth_routes_1 = require("./src/modules/auth/auth.routes");
const globalError_1 = require("./src/middleware/globalError");
const organization_routes_1 = require("./src/modules/organization/organization.routes");
(0, dbConnection_1.dbConnection)();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
dotenv.config({ path: './config/.env' });
app.use(express_1.default.json());
app.use("/auth", auth_routes_1.authRouter);
app.use("/organization", organization_routes_1.orgRouter);
app.get('/', (req, res) => res.send('Hello World!'));
app.use(globalError_1.globalError);
process.on("unhandledRejection", (err) => { console.log(err); });
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
