"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fbrequest_1 = require("../fbrequest");
const logger_1 = __importDefault(require("../../logger"));
const idx_1 = __importDefault(require("idx"));
/**
 *
 * @param url URL of the media to be uploaded
 * @param type type of media
 */
const uploadMedia = (url, type) => {
    return new Promise((resolve) => {
        if (!url)
            resolve(null);
        const opts = {
            form: {
                message: {
                    attachment: {
                        type,
                        payload: {
                            is_reusable: true,
                            url,
                        },
                    },
                },
            },
        };
        fbrequest_1.uploading(opts, (err, resp) => {
            if (err) {
                logger_1.default.error(err);
            }
            resolve(idx_1.default(resp, (_) => _.body.attachment_id));
        });
    });
};
exports.uploadMedia = uploadMedia;
//# sourceMappingURL=utility.js.map