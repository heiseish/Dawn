"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
if (process.env.NODE_ENV !== 'production')
    dotenv_1.default.config();
const crypto_json_1 = __importDefault(require("crypto-json"));
const environment_1 = require("../environment");
const encoding = 'hex';
/**
 * Encode JSON object with hidden CIPHER
 * @param {object} object to-be-encrypted object
 * @returns {object} encrypted object
 */
const encrypt = (object) => {
    if (typeof object !== 'object') {
        throw new Error('Cannot encrypt non-object');
    }
    return crypto_json_1.default.encrypt(object, environment_1.PASSKEY, {
        algorithm: environment_1.CIPHER,
        encoding,
        keys: [],
    });
};
exports.encrypt = encrypt;
/**
 * Decode JSON object with CIPHER
 * @param {object} object to-be-decrypted object
 * @returns {object} decrypted object
 */
const decrypt = (object) => {
    if (typeof object !== 'object') {
        throw new Error('Cannot decrypt non-object: ' + object);
    }
    return crypto_json_1.default.decrypt(object, environment_1.PASSKEY, {
        algorithm: environment_1.CIPHER,
        encoding,
        keys: [],
    });
};
exports.decrypt = decrypt;
//# sourceMappingURL=encrypt.js.map