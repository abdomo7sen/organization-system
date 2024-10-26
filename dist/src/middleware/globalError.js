"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalError = void 0;
const globalError = (err, req, res, next) => {
    const code = err.statusCode || 500;
    res.status(code).json({
        error: err.message,
        code,
        stack: err.stack,
    });
};
exports.globalError = globalError;
