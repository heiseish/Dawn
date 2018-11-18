"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("./db"));
const Schema = db_1.default.Schema;
const textSchema = new Schema({
    correctlyResponded: { type: Boolean, default: false, index: true },
    originalText: String,
    tokenizedText: [String],
    timeStamp: { type: Date, default: Date.now },
}, { strict: false });
exports.textSchema = textSchema;
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
const Text = db_1.default.model('Text', textSchema);
exports.Text = Text;
//# sourceMappingURL=text.js.map