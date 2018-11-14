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
const fbrequest_1 = require("../fbrequest");
/**
 * Send image
 * @param senderId id of user
 * @param url url of the image
 * @param cb callback function
 */
exports.default = (senderId, url, cb) => __awaiter(this, void 0, void 0, function* () {
    const opts = {
        form: {
            recipient: {
                id: senderId,
            },
            message: {
                attachment: {
                    type: 'image',
                    payload: {
                        url,
                    },
                },
            },
            messaging_type: 'RESPONSE',
        },
    };
    fbrequest_1.messaging(opts, (err, resp, data) => {
        if (cb) {
            cb(err || (data.error && data.error.message), data);
        }
    });
});
//# sourceMappingURL=sendImage.js.map