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
/**
 * Send Media template
 * @param senderId ID of sender
 * @param msg Media to sent
 * @param quickReplies quick replies options to be displayed
 * @param cb callback function when opt is executed
 */
exports.default = (senderId, msg, ...quickReplies) => __awaiter(this, void 0, void 0, function* () {
    const opts = {
        form: {
            recipient: {
                id: senderId,
            },
            message: {
                text: msg,
                quick_replies: quickReplies,
            },
            messaging_type: 'RESPONSE',
        },
    };
    fbrequest_1.messaging(opts, (err) => {
        if (err) {
            logger_1.default.error(err);
        }
    });
});
//# sourceMappingURL=quickReply.js.map