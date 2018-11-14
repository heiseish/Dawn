"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const environment_1 = require("../environment");
const request_1 = __importDefault(require("request"));
const messaging = request_1.default.defaults({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    method: 'POST',
    json: true,
    qs: { access_token: environment_1.FB_PAGE_TOKEN },
    headers: { 'Content-Type': 'application/json' },
});
exports.messaging = messaging;
const uploading = request_1.default.defaults({
    uri: 'https://graph.facebook.com/v2.6/me/message_attachments',
    method: 'POST',
    json: true,
    qs: { access_token: environment_1.FB_PAGE_TOKEN },
    headers: { 'Content-Type': 'application/json' },
});
exports.uploading = uploading;
//# sourceMappingURL=fbrequest.js.map