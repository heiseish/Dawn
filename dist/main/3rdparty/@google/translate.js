"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const translate_1 = require("@google-cloud/translate");
const environment_1 = require("../../environment");
const logger_1 = __importDefault(require("../../logger"));
const controller_1 = require("./controller");
/**
 * Translate text using google eapi
 * @param {string} textToTranslate
 * @param {string} languageToTranslateTo
 */
const translate = (textToTranslate, languageToTranslateTo = 'en') => {
    return new Promise((resolve, reject) => {
        if (!controller_1.USING_TRANSLATION) {
            resolve(textToTranslate);
        }
        else {
            logger_1.default.info(`Translating ${textToTranslate} to ${languageToTranslateTo}...`);
            const PROJECT_ID = environment_1.GOOGLE_PROJECT_ID;
            const translate = new translate_1.Translate({
                projectId: PROJECT_ID,
                keyFilename: environment_1.GOOGLE_APPLICATION_CREDENTIALS,
            });
            translate
                .translate(textToTranslate, languageToTranslateTo)
                .then((results) => resolve(results[0]))
                .catch((err) => reject(err));
        }
    });
};
exports.translate = translate;
//# sourceMappingURL=translate.js.map