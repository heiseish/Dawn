"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const singleCascadeText_1 = __importDefault(require("./singleCascadeText"));
/**
 * Create response schema
 * @param {any} mongoose mongdb connectoin
 */
const createResponseSchema = (mongoose) => {
    const Schema = mongoose.Schema;
    return new Schema({
        answerable: Boolean,
        simpleText: String,
        image: String,
        imageId: Number,
        url: String,
        cascadeText: [singleCascadeText_1.default(mongoose)],
        multipleText: [String],
    }, { strict: false, _id: false });
};
exports.default = createResponseSchema;
//# sourceMappingURL=response.js.map