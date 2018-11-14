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
const logger_1 = __importDefault(require("../../logger"));
const fbrequest_1 = require("../fbrequest");
const utility_1 = require("./utility");
/**
 * Send Media template
 * @param senderId ID of sender
 * @param media Media to sent
 * @param button Button to show under the media
 * @param cb callback function when opt is executed
 */
exports.default = (senderId, media, button, cb) => __awaiter(this, void 0, void 0, function* () {
    const opts = {
        form: {
            recipient: {
                id: senderId,
            },
            message: {
                attachment: {
                    type: 'template',
                    payload: {
                        template_type: 'media',
                        elements: [
                            {
                                media_type: media.type ? 'image' : 'video',
                                attachment_id: media.id || (yield utility_1.uploadMedia(media.url, media.type)),
                                buttons: button ? [
                                    {
                                        type: 'web_url',
                                        url: button.url,
                                        title: button.title,
                                    },
                                ] : null,
                            },
                        ],
                    },
                },
            },
            messaging_type: 'RESPONSE',
        },
    };
    fbrequest_1.messaging(opts, (err, resp, data) => {
        if (err) {
            logger_1.default.error(err);
        }
        if (cb) {
            cb(err || (data.error && data.error.message), data);
        }
    });
});
//# sourceMappingURL=mediaTemplate.js.map