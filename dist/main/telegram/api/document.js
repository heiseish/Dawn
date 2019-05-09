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
const __1 = require("../");
exports.default = (chatId, url, reply, messageId) => __awaiter(this, void 0, void 0, function* () {
    try {
        if (reply) {
            return yield __1.telegramEndpoint.sendDocument(chatId, url, {
                reply_to_message_id: messageId,
            });
        }
        else {
            return yield __1.telegramEndpoint.sendDocument(chatId, url);
        }
    }
    catch (e) {
        return Promise.reject(e);
    }
});
//# sourceMappingURL=document.js.map