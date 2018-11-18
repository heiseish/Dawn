"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("./db"));
const listTemplateButton_1 = __importDefault(require("./listTemplateButton"));
const Schema = db_1.default.Schema;
exports.default = new Schema({
    title: String,
    subtitle: String,
    image_url: String,
    buttons: [listTemplateButton_1.default],
}, { strict: false, _id: false });
//# sourceMappingURL=singleCascadeText.js.map