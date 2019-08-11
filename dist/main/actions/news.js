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
const news_1 = require("../3rdparty/news");
const array_1 = require("../utils/array");
class News {
    constructor() {
        this.name = 'news';
        /**
         * Reply to good bye message
         * @param {dawn.Context} user
         * @return updated user
         */
        this.execute = (user) => __awaiter(this, void 0, void 0, function* () {
            try {
                const articles = array_1.shuffle(yield news_1.getAllHeadlines(user)).slice(0, 4);
                user.response = {
                    text: [],
                    image: [],
                    url: []
                };
                for (let art of articles) {
                    if (art.title)
                        user.response.text.push(art.title);
                    if (art.urlToImage)
                        user.response.image.push(art.urlToImage);
                    if (art.url)
                        user.response.url.push(art.url);
                }
                return user;
            }
            catch (e) {
                return Promise.reject(e);
            }
        });
    }
}
exports.default = News;
//# sourceMappingURL=news.js.map