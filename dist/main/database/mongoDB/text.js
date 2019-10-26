"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Create text schema
 * @param mongoose mongodb connection
 * @returns {Schema} mongoose schema for text
 */
const createTextSchema = (mongoose) => {
    const Schema = mongoose.Schema;
    const textSchema = new Schema({
        correctlyResponded: { type: Boolean, default: false, index: true },
        originalText: String,
        tokenizedText: [String],
        timeStamp: { type: Date, default: Date.now },
    }, { strict: false });
    textSchema.statics.findAll = function () {
        this.find({}, function (err, texts) {
            if (err) {
                return Promise.reject(err);
            }
            else {
                return Promise.resolve(texts);
            }
        });
    };
    textSchema.statics.findIncorrectResponse = function () {
        this.find({ correctlyResponded: false }, (err, texts) => {
            if (err) {
                return Promise.reject(err);
            }
            else {
                return Promise.resolve(texts);
            }
        });
    };
    textSchema.statics.deleteAll = function () {
        this.find({}, function (err, texts) {
            if (err) {
                return Promise.reject(err);
            }
            else {
                for (const text of texts) {
                    text.remove((err) => {
                        if (err) {
                            return Promise.reject(err);
                        }
                    });
                }
            }
        });
    };
    return mongoose.model('Text', textSchema);
};
exports.default = createTextSchema;
//# sourceMappingURL=text.js.map