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
const api_1 = require("./api");
/**
* Respond in telegram
* @param {dawn.Context} user
*/
exports.default = (ctx) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { chat_id, message_id, } = ctx.chat;
        const response = ctx.response;
        if (response.text && response.image && response.text.length == response.image.length) {
            for (let i = 0; i < response.text.length; ++i) {
                yield api_1.tlgMessage(chat_id, response.text[i]);
                yield api_1.tlgImage(chat_id, response.image[i]);
            }
            return;
        }
        if (response.text) {
            for (let txt of response.text) {
                yield api_1.tlgMessage(chat_id, txt, true, message_id);
            }
            return;
        }
        if (response.image) {
            for (let img of response.image) {
                yield api_1.tlgDocument(chat_id, img);
            }
            return;
        }
    }
    catch (e) {
        return Promise.reject(e);
    }
});
//# sourceMappingURL=respond.js.map