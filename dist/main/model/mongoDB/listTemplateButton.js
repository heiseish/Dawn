"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("./db"));
const Schema = db_1.default.Schema;
exports.default = new Schema({
    title: String,
    type: String,
    url: String,
    webview_height_ratio: String,
}, { strict: false, _id: false });
//# sourceMappingURL=listTemplateButton.js.map