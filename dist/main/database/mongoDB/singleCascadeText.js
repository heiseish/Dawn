"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const listTemplateButton_1 = __importDefault(require("./listTemplateButton"));
/**
 * Create a single caseCadetext schema
 * @param {any} mongoose mongodb connection
 */
exports.default = (mongoose) => {
    const Schema = mongoose.Schema;
    return new Schema({
        title: String,
        subtitle: String,
        image_url: String,
        buttons: [listTemplateButton_1.default(mongoose)],
    }, { strict: false, _id: false });
};
//# sourceMappingURL=singleCascadeText.js.map