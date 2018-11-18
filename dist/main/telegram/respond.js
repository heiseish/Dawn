"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const string_1 = require("../lib/string");
const api_1 = require("./api");
/**
* Respond in telegram
* @param {any} payload
* @param {userType} user
*/
exports.default = (payload, user) => __awaiter(this, void 0, void 0, function* () {
    try {
        const chat = payload.chat.id;
        const msgId = payload.message_id;
        const response = user.response;
        if (!response.answerable) {
            yield api_1.tlgMessage(chat, string_1.randomConfusedMessage(user.name.first), true, msgId);
            return;
        }
        if (response.simpleText) {
            yield api_1.tlgMessage(chat, response.simpleText, true, msgId);
            if (response.image) {
                yield api_1.tlgImage(chat, response.image);
            }
        }
        else if (response.cascadeText) {
            for (const i of response.cascadeText) {
                yield api_1.tlgMessage(chat, i.title + '\n' + i.buttons[0].url);
                yield api_1.tlgImage(chat, i.image_url);
            }
        }
        else if (response.multipleText) {
            for (const text of response.multipleText) {
                yield api_1.tlgMessage(chat, text);
            }
        }
    }
    catch (e) {
        return Promise.reject(e);
    }
});
//# sourceMappingURL=respond.js.map