"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Create name schema
 * @param mongoose mongdb connection
 */
const createNameSchema = (mongoose) => {
    const Schema = mongoose.Schema;
    return new Schema({
        first: String,
        last: String,
        full: { type: String, index: true },
    }, { strict: false, _id: false });
};
exports.default = createNameSchema;
//# sourceMappingURL=name.js.map