"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const intentClassification_1 = require("./3rdparty/@google/tensorflow/intentClassification");
const logger_1 = __importDefault(require("./logger"));
const CLASSIFY_CONFIDENCE_THRESHOLD = 0.9;
const UNKNOWN_INTENT = 'unknown';
/**
* Return the text or document along with the intent of the message
* @param {supportedPlatform} platform
* @param {any} payload
* @param {dawn.Context} user
* @return updated user
*/
exports.default = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const log = logger_1.default.info('Analyzing...', true);
    try {
        if (ctx.document) {
            ctx.entity = 'document';
        }
        if (ctx.text) {
            ctx.text = reformat(ctx.text);
            ctx.entity = yield findIntent(ctx.text);
        }
        return ctx;
    }
    catch (e) {
        return Promise.reject(e);
    }
    finally {
        log.stop('Analyzed.');
    }
});
/**
* Find the intent in the text message from the convo
* @param {string} text
* @return intent of the text
*/
const findIntent = (text) => __awaiter(this, void 0, void 0, function* () {
    try {
        const result = yield intentClassification_1.predict(text);
        let { intent, confidence, } = result;
        intent = confidence >= CLASSIFY_CONFIDENCE_THRESHOLD ? intent : UNKNOWN_INTENT;
        return intent;
    }
    catch (e) {
        return Promise.reject(e);
    }
});
/**
 * strim text to prevent the link being sent to RNN server
 * @param text Text to be formatted
 * @returns formatted text
 */
const reformat = (text) => {
    text = text.replace('/', ' ');
    text = text.replace('https:', '');
    return text;
};
//# sourceMappingURL=analyze.js.map