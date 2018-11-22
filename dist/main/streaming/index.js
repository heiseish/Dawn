"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebasedb_1 = __importDefault(require("../model/database/firebasedb"));
const account_1 = require("./../utils/account");
const logger_1 = __importDefault(require("../logger"));
const message_1 = __importDefault(require("../messenger/api/message"));
const sendImage_1 = __importDefault(require("../messenger/api/sendImage"));
const api_1 = require("../telegram/api/");
/**
 *
 * @param toStream object to stream
 */
const stream = (toStream) => {
    firebasedb_1.default.database().ref('restricted_access/streaming/').on('value', (snap) => {
        const result = snap.val();
        let audience;
        if (Array.isArray(result))
            audience = result;
        else if (typeof result === 'object')
            audience = Object.values(result);
        for (let userId of audience) {
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
            message(id, toStream.text);
            if (toStream.image)
                image(id, toStream.image);
        }
    }, (err) => {
        logger_1.default.error(err);
    });
};
exports.default = stream;
//# sourceMappingURL=index.js.map