"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin = __importStar(require("firebase-admin"));
const encrypt_1 = require("../../lib/encrypt");
const account_json_1 = __importDefault(require("./account.json"));
const firebase = process.env.NODE_ENV === 'production' ? admin.initializeApp({
    credential: admin.credential.cert(encrypt_1.decrypt(account_json_1.default)),
    databaseURL: 'https://mvpapp-1ba71.firebaseio.com',
}) : undefined;
exports.default = firebase;
//# sourceMappingURL=firebasedb.js.map