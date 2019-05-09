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
const translate_1 = require("./externalApis/@google/translate");
const logger_1 = __importDefault(require("./logger"));
const respond_1 = __importDefault(require("./messenger/respond"));
const respond_2 = __importDefault(require("./telegram/respond"));
/**
* Respond to original message
* @param {supportedPlatform} platform
* @param {any} payload
* @param {userType} user
*/
exports.default = (platform, payload, user) => __awaiter(this, void 0, void 0, function* () {
    try {
        const log = logger_1.default.info('Responding...', true);
        user = yield prepareResponseForSending(user);
        switch (platform) {
            case 'telegram':
                yield respond_2.default(payload, user);
                break;
            case 'messenger':
                yield respond_1.default(user);
                break;
            default:
        }
        user.response = { /* Sanitize reponse object */};
        log.stop('Responded.');
    }
    catch (e) {
        return Promise.reject(e);
    }
});
/**
* Sync the language of the response with the locale of the convo
* @param {userType} user
* @returns {userType} updated user
*/
const prepareResponseForSending = (user) => __awaiter(this, void 0, void 0, function* () {
    try {
        const response = user.response;
        if (response.simpleText) {
            const responseLang = 'eng';
            if (responseLang !== user.locale) {
                user.response = Object.assign({}, response, { simpleText: yield translate_1.translate(response.simpleText, user.locale) });
            }
        }
        return user;
    }
    catch (e) {
        return Promise.reject(e);
    }
});
//# sourceMappingURL=respond.js.map