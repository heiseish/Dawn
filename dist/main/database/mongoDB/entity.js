"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * createEntitySchema
 * @param mongoose mongodb connection
 */
const createEntitySchema = (mongoose) => {
    const Schema = mongoose.Schema;
    return new Schema({
        lastIntent: String,
        sentiment: String,
    }, { strict: false, _id: false });
};
exports.default = createEntitySchema;
//# sourceMappingURL=entity.js.map