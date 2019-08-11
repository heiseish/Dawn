"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const environment_1 = require("../environment");
if (!environment_1.FB_PAGE_ID)
    throw new Error('missing FB_PAGE_ID');
if (!environment_1.FB_PAGE_TOKEN)
    throw new Error('missing FB_PAGE_TOKEN');
exports.default = (req) => {
    let id = req.sender.id ? req.sender.id : '';
    let context = {
        platform: 'messenger',
        id: id,
        locale: 'eng'
    };
    if (req.message.text) {
        context.text = req.message.text;
    }
    if (req.message && req.message.quick_reply) {
        context.document = {
            type: 'QUICK_REPLY',
            value: req.message.quick_reply.payload
        };
    }
    if (req.message.attachments) {
        let attachment = req.message.attachments[0];
        switch (attachment.type) {
            case 'image':
                context.document = {
                    type: 'image',
                };
                break;
            case 'video':
                context.document = {
                    type: 'video',
                };
                break;
            case 'audio':
                context.document = {
                    type: 'audio',
                };
                break;
            case 'location':
                context.location = {
                    lat: attachment.payload.coordinates.lat,
                    long: attachment.payload.coordinates.long,
                };
                break;
        }
    }
    return context;
};
//# sourceMappingURL=preprocess.js.map