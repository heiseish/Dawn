"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
* createDocSchema
* @param mongoose mongodb connection
*/
const createDocSchema = (mongoose) => {
    const Schema = mongoose.Schema;
    return new Schema({
        type: String,
        value: String,
    }, { strict: false, _id: false });
};
exports.default = createDocSchema;
//# sourceMappingURL=doc.js.map