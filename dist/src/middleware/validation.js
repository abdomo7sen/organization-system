"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const appError_js_1 = require("../utils/appError.js");
const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(Object.assign(Object.assign(Object.assign({}, req.body), req.params), req.query), { abortEarly: false });
        if (!error) {
            return next();
        }
        else {
            let msg = error.details.map((element) => element.message);
            return next(new appError_js_1.AppError(msg, 404));
        }
    };
};
exports.validate = validate;
