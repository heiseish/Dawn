"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const message_1 = __importDefault(require("../messenger/api/message"));
const sendImage_1 = __importDefault(require("../messenger/api/sendImage"));
const api_1 = require("../telegram/api/");
const account_1 = require("./../utils/account");
/**
*
* @param {StreamableObject} toStream object to stream
* @param {string[]} list list of people to send stream to
*/
const stream = (toStream, list) => {
    for (const userId of list) {
        const { platform, id, } = account_1.getPlatformAndId(userId);
        let message, image;
        if (platform === 'messenger') {
            message = message_1.default;
            image = sendImage_1.default;
        }
        else {
            message = api_1.tlgMessage;
            image = api_1.tlgImage;
        }
        if (toStream.text)
            message(id, toStream.text);
        if (toStream.image)
            image(id, toStream.image);
    }
};
exports.default = stream;
//# sourceMappingURL=index.js.map