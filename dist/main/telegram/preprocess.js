"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
* Only reply to private IM or group message that tag the bot
* @param {any} msg
* @return a string if message is valid or null
*/
exports.default = (msg) => {
    if (msg.from.id === msg.chat.id
        || msg.text.indexOf('@openAImatchThis_bot') !== -1)
        return Object.assign({}, msg, { text: msg.text.replace('@openAImatchThis_bot', '') });
    else
        return null;
};
//# sourceMappingURL=preprocess.js.map