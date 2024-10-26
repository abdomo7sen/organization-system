"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.payment = exports.systemRole = void 0;
const systemRole = {
    ADMIN: 'admin',
    USER: 'user'
};
exports.systemRole = systemRole;
Object.freeze(systemRole);
const payment = {
    CASH: 'cash',
    CARD: 'card'
};
exports.payment = payment;
Object.freeze(payment);
