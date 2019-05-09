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
const core_1 = __importDefault(require("lodash/core"));
const news_1 = require("../externalApis/news");
const array_1 = require("../utils/array");
const utils_1 = require("./utils");
const NO_ARTICLE_FOUND = 'Sorry no article found :<';
/**
 * Send news to user
 * @param {userType} user
 * @returns updated user
 */
exports.default = (user) => __awaiter(this, void 0, void 0, function* () {
    try {
        const articles = array_1.shuffle(yield news_1.getAllHeadlines(user)).slice(0, 4);
        if (!core_1.default.isEmpty(articles)) {
            const parsedArticles = utils_1.parseArticles(articles);
            user.response = {
                cascadeText: parsedArticles,
                answerable: true,
            };
        }
        else {
            user.response = {
                answerable: true,
                simpleText: NO_ARTICLE_FOUND,
            };
        }
        return user;
    }
    catch (e) {
        return Promise.reject(e);
    }
});
//# sourceMappingURL=news.js.map