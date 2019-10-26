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
const newsapi_1 = __importDefault(require("newsapi"));
const environment_1 = require("../environment");
const newsapi = new newsapi_1.default(environment_1.NEWSAPI_KEY);
const array_1 = require("../utils/array");
const string_1 = require("../utils/string");
const GOOD_SOURCES = 'bbc-news,the-verge,bbc-sport,bloomberg,business-insider,business-insider-uk,cnn,espn,google-news,mtv-news,the-economist,the-new-york-times,the-washington-post';
const MAP_TOPIC_TO_CATEGORY = {
    sport: 'sports',
    health: 'health',
    business: 'business',
    entertain: 'entertainment',
    general: 'general',
    technolog: 'technology',
    scienc: 'science',
};
/**
* Get top headlines
* @param {dawn.Context} user
* @return {news.article} articles
*/
const getAllHeadlines = (user) => __awaiter(this, void 0, void 0, function* () {
    if (!environment_1.NEWSAPI_KEY)
        return Promise.reject('missing NEWSAPI_KEY');
    let text = user.lastText;
    if (text.includes('"')) {
        text = string_1.replaceAllSubstring(text, '"', '“', '”', 'SHOW', 'NEWS', 'WITH', 'ABOUT', 'ON');
        return yield getHeadlinesWithQuery(text);
    }
    const common = yield array_1.getCommonMembersFromTwoArrays(Object.keys(MAP_TOPIC_TO_CATEGORY), text[text.length - 1].split(' '));
    const category = MAP_TOPIC_TO_CATEGORY[common[0]] || null;
    if (category) {
        return yield getHeadlinesWithCategory(category);
    }
    return yield getRandomTop5Headlines();
});
exports.getAllHeadlines = getAllHeadlines;
/**
* Get a random headline and return the title along with the message
*/
const getRandomHeadlines = () => __awaiter(this, void 0, void 0, function* () {
    if (!environment_1.NEWSAPI_KEY)
        throw new Error('missing NEWSAPI_KEY');
    try {
        let res = yield newsapi.v2
            .topHeadlines({
            sources: 'techcrunch',
            language: 'en',
        });
        const article = res.articles[Math.floor(Math.random() * res.articles.length)];
        return `Random news: ${article.title}`;
    }
    catch (e) {
        return Promise.reject(e);
    }
});
exports.getRandomHeadlines = getRandomHeadlines;
/**
* Search for articles containing key words
* @param {string} keyword
*/
const getHeadlinesWithQuery = (keyword) => __awaiter(this, void 0, void 0, function* () {
    if (!environment_1.NEWSAPI_KEY)
        throw new Error('missing NEWSAPI_KEY');
    try {
        let res = yield newsapi.v2.topHeadlines({
            sources: GOOD_SOURCES,
            q: keyword,
            language: 'en',
        });
        return res.articles;
    }
    catch (e) {
        return Promise.reject(e);
    }
});
exports.getHeadlinesWithQuery = getHeadlinesWithQuery;
/**
* Search for articles in this category
* @param {string | null} category
*/
const getHeadlinesWithCategory = (category) => __awaiter(this, void 0, void 0, function* () {
    if (!environment_1.NEWSAPI_KEY)
        throw new Error('missing NEWSAPI_KEY');
    try {
        let res = yield newsapi.v2.topHeadlines({
            category,
            language: 'en',
            country: 'us',
        });
        return res.articles;
    }
    catch (e) {
        return Promise.reject(e);
    }
});
exports.getHeadlinesWithCategory = getHeadlinesWithCategory;
/**
* Get random top headlines articles
*/
const getRandomTop5Headlines = () => __awaiter(this, void 0, void 0, function* () {
    if (!environment_1.NEWSAPI_KEY)
        throw new Error('missing NEWSAPI_KEY');
    try {
        let res = yield newsapi.v2.topHeadlines({
            sources: GOOD_SOURCES,
            language: 'en',
        });
        return res.articles;
    }
    catch (e) {
        return Promise.reject(e);
    }
});
exports.getRandomTop5Headlines = getRandomTop5Headlines;
//# sourceMappingURL=news.js.map