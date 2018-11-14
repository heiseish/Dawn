"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
if (process.env.NODE_ENV === 'production')
    require('dotenv').load();
const crypto_json_1 = __importDefault(require("crypto-json"));
const cipher = process.env.CIPHER;
const passKey = process.env.PASSKEY;
const encoding = 'hex';
/**
 * Encode JSON object with hidden cipher
 * @param {any} object
 */
const encrypt = (object) => {
    if (typeof object !== 'object') {
        throw new Error('Cannot encrypt non-object');
    }
    return crypto_json_1.default.encrypt(object, passKey, {
        algorithm: cipher,
        encoding,
        keys: [],
    });
};
exports.encrypt = encrypt;
/**
 * Decode JSON object with cipher
 * @param {any} object
 */
const decrypt = (object) => {
    if (typeof object !== 'object')
        throw new Error('Cannot decrypt non-object: ' + object);
    return crypto_json_1.default.decrypt(object, passKey, {
        algorithm: cipher,
        encoding,
        keys: [],
    });
};
exports.decrypt = decrypt;
//# sourceMappingURL=encrypt.js.map