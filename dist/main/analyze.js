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
const idx_1 = __importDefault(require("idx"));
const intentClassification_1 = require("./externalApis/@google/tensorflow/intentClassification");
const logger_1 = __importDefault(require("./logger"));
const CLASSIFY_CONFIDENCE_THRESHOLD = 0.9;
const core_1 = __importDefault(require("lodash/core"));
/**
* Return the text or document along with the intent of the message
* @param {supportedPlatform} platform
* @param {any} payload
* @param {userType} user
* @return updated user
*/
exports.default = (platform, payload, user) => __awaiter(this, void 0, void 0, function* () {
    const log = logger_1.default.info('Analyzing...', true);
    try {
        const { text, document, sentiment, } = getInformationFromMessage(platform, payload);
        user.platform = platform;
        if (!core_1.default.isEmpty(document)) {
            user.entity.lastIntent = 'sendDocument';
            user.lastDoc = document;
        }
        else if (text) {
            user.locale = checkLang();
            user.lastText = reformat(text);
            const intent = yield findIntent(text);
            if (typeof intent === 'string') {
                user.entity.lastIntent = intent;
                user.entity.sentiment = sentiment;
            }
            else {
                user.entity.lastIntent = 'unknown';
                user.entity.sentiment = sentiment;
            }
        }
        return user;
    }
    catch (e) {
        return Promise.reject(e);
    }
    finally {
        log.stop('Analyzed.');
    }
});
/**
* Get the information from the message sent by user
* @param {supportedPlatform} platform
* @param {any} payload
* @return Info object
*/
const getInformationFromMessage = (platform, payload) => {
    const info = {
        text: null,
        sentiment: 'neutral',
        document: {},
    };
    switch (platform) {
        /* Telegram */
        case 'telegram':
            info.text = payload.text || null,
                info.sentiment = 'neutral'; /* TODO */
            if (payload.photo) {
                info.document.type = 'image';
                info.document.payload = payload.photo[0];
            }
            break;
        /* Messager */
        case 'messenger':
            if (idx_1.default(payload, (_) => _.message.quick_reply)) {
                const Msgpayload = idx_1.default(payload, (_) => _.message.quick_reply.payload);
                if (Msgpayload === 'CORRECT_SERVICE' || Msgpayload === 'INCORRECT_SERVICE') {
                    info.document = {
                        type: 'QUICK_REPLY',
                        value: Msgpayload,
                    };
                }
            }
            else if (idx_1.default(payload, (_) => _.message.text)) {
                info.text = payload.message.text;
            }
            else if (idx_1.default(payload, (_) => _.message.attachments)) {
                switch (payload.message.attachments[0].type) {
                    case 'image':
                        info.document = {
                            type: 'image',
                        };
                        break;
                    case 'video':
                        info.document = {
                            type: 'video',
                        };
                        break;
                    case 'audio':
                        // message(senderId, await speechToText(payload.message.attachments[0].payload.url))
                        info.document = {
                            type: 'audio',
                        };
                        break;
                    case 'location':
                        info.document = {
                            type: 'location',
                            lat: idx_1.default(payload, (_) => _.message.attachments[0].payload.coordinates.lat),
                            long: idx_1.default(payload, (_) => _.message.attachments[0].payload.coordinates.long),
                        };
                        break;
                }
            }
            break;
    }
    return info;
};
/**
* Find the intent in the text message from the convo
* @param {string} text
* @return intent of the text
*/
const findIntent = (text) => __awaiter(this, void 0, void 0, function* () {
    try {
        const result = yield intentClassification_1.predict(text);
        let { intent, confidence, } = result;
        intent = confidence >= CLASSIFY_CONFIDENCE_THRESHOLD ? intent : null;
        return intent;
    }
    catch (e) {
        return Promise.reject(e);
    }
});
/**
* //TODO
*/
const checkLang = () => 'en';
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