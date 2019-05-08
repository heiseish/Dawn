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
const string_1 = require("../lib/string");
const timer_1 = require("../utils/timer");
const listTemplate_1 = __importDefault(require("./api/listTemplate"));
const mediaTemplate_1 = __importDefault(require("./api/mediaTemplate"));
const message_1 = __importDefault(require("./api/message"));
const quickReply_1 = __importDefault(require("./api/quickReply"));
const TIME_WAITED_BEFORE_CONFIRMING = 3000;
/**
* Respond in facebook messenger
* @param {userType} user
*/
exports.default = (user) => __awaiter(this, void 0, void 0, function* () {
    try {
        const fbId = user.id.replace('mes', '');
        const response = user.response;
        const imageId = response.image && !response.image.includes('http');
        // Messenger SDK require exact object structure. Thus the need to convert mongoose object to js object
        if (!response.answerable) {
            yield message_1.default(fbId, string_1.randomConfusedMessage(user.name.first));
        }
        else if (response.simpleText && !response.image && !imageId) {
            yield message_1.default(fbId, response.simpleText);
        }
        else if (response.simpleText && (response.image || imageId)) {
            const media = {
                type: 'image',
                // url: response.image,
                id: response.image,
            };
            /** Need more general cases here */
            let button = null;
            if (response.url) {
                button = {
                    title: 'View Article',
                    url: response.url,
                };
            }
            yield mediaTemplate_1.default(fbId, media, button);
            yield message_1.default(fbId, response.simpleText);
        }
        else if (response.cascadeText) {
            if (response.cascadeText.length == 1) {
                const topArticle = response.cascadeText[0];
                message_1.default(fbId, topArticle.title, () => {
                    const media = {
                        type: 'image',
                        url: topArticle.image_url,
                    };
                    let button = null;
                    if (topArticle.buttons[0].url) {
                        button = {
                            title: 'View Article',
                            url: topArticle.buttons[0].url,
                        };
                    }
                    mediaTemplate_1.default(fbId, media, button);
                });
            }
            else {
                yield listTemplate_1.default(fbId, response.cascadeText);
            }
        }
        else if (response.multipleText) {
            for (const text of response.multipleText) {
                yield message_1.default(fbId, text);
            }
        }
        timer_1.waitToDo(TIME_WAITED_BEFORE_CONFIRMING, sendResponseConfirmation.bind(null, fbId));
    }
    catch (e) {
        return Promise.reject(e);
    }
});
/**
* send a confirmation for the bot's response
* @param {string} fbId
*/
const sendResponseConfirmation = (fbId) => {
    quickReply_1.default(fbId, "Is this what you's asking for?", {
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