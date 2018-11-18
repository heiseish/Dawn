"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("./db"));
const singleCascadeText_1 = __importDefault(require("./singleCascadeText"));
const Schema = db_1.default.Schema;
exports.default = new Schema({
    answerable: Boolean,
    simpleText: String,
    image: String,
    imageId: Number,
    url: String,
    cascadeText: [singleCascadeText_1.default],
    multipleText: [String],
}, { strict: false, _id: false });
//# sourceMappingURL=response.js.map