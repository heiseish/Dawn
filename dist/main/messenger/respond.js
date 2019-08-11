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
const mediaTemplate_1 = __importDefault(require("./api/mediaTemplate"));
const message_1 = __importDefault(require("./api/message"));
const quickReply_1 = __importDefault(require("./api/quickReply"));
const TIME_WAITED_BEFORE_CONFIRMING = 3000;
/**
* Respond in facebook messenger
* @param {dawn.Context} ctx
*/
exports.default = (ctx) => __awaiter(this, void 0, void 0, function* () {
    try {
        const id = ctx.id;
        const response = ctx.response;
        // Messenger SDK require exact object structure. Thus the need to convert mongoose object to js object
        if (response.text && !response.image) {
            for (let txt of response.text) {
                yield message_1.default(id, txt);
            }
            return;
        }
        if (response.text && response.image && response.text.length == response.image.length) {
            for (let i = 0; i < response.text.length; ++i) {
                const media = {
                    type: 'image',
                    id: response.image[i],
                };
                /** Need more general cases here */
                let button = null;
                if (response.url.length > i) {
                    button = {
                        title: 'View Article',
                        url: response.url[i],
                    };
                    message_1.default(id, response.text[i], () => {
                        mediaTemplate_1.default(id, media, button);
                    });
                }
                else {
                    yield mediaTemplate_1.default(id, media, button);
                    yield message_1.default(id, response.text[i]);
                }
            }
            return;
        }
        // waitToDo(TIME_WAITED_BEFORE_CONFIRMING, sendResponseConfirmation.bind(null, id));
    }
    catch (e) {
        return Promise.reject(e);
    }
});
/**
* send a confirmation for the bot's response
* @param {string} id
*/
const sendResponseConfirmation = (id) => {
    quickReply_1.default(id, "Is this what you's asking for?", {
        content_type: 'text',
        title: 'Yup!',
        payload: 'CORRECT_SERVICE',
        image_url: 'https://vignette.wikia.nocookie.net/whentheycry/images/2/2a/Check.png/revision/latest?cb=20120629163937',
    }, {
        content_type: 'text',
        title: 'Nope!',
        payload: 'INCORRECT_SERVICE',
        image_url: 'https://www.clker.com/cliparts/8/3/3/4/1195445190322000997molumen_red_round_error_warning_icon.svg.med.png',
    });
};
//# sourceMappingURL=respond.js.map