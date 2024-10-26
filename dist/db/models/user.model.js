"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const USER_COLLECTION_NAME = "User";
const schema = new mongoose_1.Schema({
    name: { type: String },
    email: String,
    password: String,
    role: { type: String,
        enum: ["admin", "user"],
        default: "user"
    }
});
schema.pre('save', function () {
    this.password = bcrypt_1.default.hashSync(this.password, 8);
});
exports.User = (0, mongoose_1.model)(USER_COLLECTION_NAME, schema);
