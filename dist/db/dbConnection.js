"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = dbConnection;
const mongoose_1 = require("mongoose");
function dbConnection() {
    (0, mongoose_1.connect)('mongodb://127.0.0.1:27017/organization-system')
        .then(() => {
        console.log('Connected to MongoDB');
    })
        .catch((err) => {
        console.log('Error connecting to MongoDB', err);
    });
}
