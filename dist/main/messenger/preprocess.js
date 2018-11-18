"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const environment_1 = require("../environment");
const senderAction_1 = require("./api/senderAction");
if (!environment_1.FB_PAGE_ID) {
    throw new Error('missing FB_PAGE_ID');
}
if (!environment_1.FB_PAGE_TOKEN) {
    throw new Error('missing FB_PAGE_TOKEN');
}
exports.default = (messagingEvents, cb) => {
    for (let i = 0; i < messagingEvents.length; i++) {
        const event = messagingEvents[i];
        const senderId = event.sender.id;
        senderAction_1.markSeen(senderId);
        senderAction_1.typingOn(senderId);
        if (cb) {
            cb(event);
        }
        senderAction_1.typingOff(senderId);
    }
};
//# sourceMappingURL=preprocess.js.map