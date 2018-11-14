"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_js_1 = __importDefault(require("./db.js"));
const Schema = db_js_1.default.Schema;
exports.default = new Schema({
    lastIntent: String,
    sentiment: String,
}, { strict: false, _id: false });
//# sourceMappingURL=entity.js.map