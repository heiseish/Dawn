"use strict";
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
if (!environment_1.NEWSAPI_KEY) {
    throw new Error('missing NEWSAPI_KEY');
}
/**
 * Get top headlines
 * @param {any} user
 */
const getAllHeadlines = (user) => {
    let text = user.lastText;
    if (text.indexOf('"') !== -1) {
        text = string_1.replaceAllSubstring(text, '"', '“', '”', 'SHOW', 'NEWS', 'WITH', 'ABOUT', 'ON');
        return new Promise((resolve) => getHeadlinesWithQuery(text).then((articles) => resolve(articles)));
    }
    else {
        const common = array_1.getCommonMembersFromTwoArrays(Object.keys(MAP_TOPIC_TO_CATEGORY), user.text[user.text.length - 1].tokenizedText);
        const category = MAP_TOPIC_TO_CATEGORY[common[0]] || null;
        if (category) {
            return new Promise((resolve) => getHeadlinesWithCategory(category).then((articles) => resolve(articles)));
        }
        else {
            return new Promise((resolve) => getRandomTop5Headlines().then((articles) => resolve(articles)));
        }
    }
};
exports.getAllHeadlines = getAllHeadlines;
/**
 * Get a random headline and return the title along with the message
 */
const getRandomHeadlines = () => {
    return new Promise((resolve) => {
        newsapi.v2
            .topHeadlines({
            sources: 'techcrunch',
            language: 'en',
        })
            .then((response) => {
            const article = response.articles[Math.floor(Math.random() * response.articles.length)];
            resolve({
                answerable: true,
                simpleText: `Random news: ${article.title}`,
                image: article.urlToImage,
                url: article.url,
            });
        });
    });
};
exports.getRandomHeadlines = getRandomHeadlines;
/**
 * Search for articles containing key words
 * @param {string} keyword
 */
const getHeadlinesWithQuery = (keyword) => {
    return new Promise((res) => {
        newsapi.v2
            .topHeadlines({
            sources: GOOD_SOURCES,
            q: keyword,
            language: 'en',
        })
            .then(response => res(response.articles));
    });
};
exports.getHeadlinesWithQuery = getHeadlinesWithQuery;
/**
 * Search for articles in this category
 * @param {string | null} category
 */
const getHeadlinesWithCategory = (category) => {
    return new Promise((res) => {
        newsapi.v2
            .topHeadlines({
            category,
            language: 'en',
            country: 'us',
        })
            .then(response => res(response.articles));
    });
};
exports.getHeadlinesWithCategory = getHeadlinesWithCategory;
/**
 * Get random top headlines articles
 */
const getRandomTop5Headlines = () => {
    return new Promise((res) => {
        newsapi.v2
            .topHeadlines({
            sources: GOOD_SOURCES,
            language: 'en',
        })
            .then((response) => res(response.articles));
    });
};
exports.getRandomTop5Headlines = getRandomTop5Headlines;
//# sourceMappingURL=news.js.map