"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * createListTemplateButtonSchema
 * @param {any} mongoose mongodb connection
 */
const createListTemplateButtonSchema = (mongoose) => {
    const Schema = mongoose.Schema;
    return new Schema({
        title: String,
        type: String,
        url: String,
        webview_height_ratio: String,
    }, { strict: false, _id: false });
};
exports.default = createListTemplateButtonSchema;
//# sourceMappingURL=listTemplateButton.js.map