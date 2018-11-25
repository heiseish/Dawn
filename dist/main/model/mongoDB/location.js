"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
* Create a location schema
* @param mongoose mongodb connection
*/
const createLocationSchema = (mongoose) => {
    const Schema = mongoose.Schema;
    return new Schema({
        lat: Number || String,
        long: Number || String,
        formattedAddress: String,
    }, { strict: false, _id: false });
};
exports.default = createLocationSchema;
//# sourceMappingURL=location.js.map