"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const idx_1 = __importDefault(require("idx"));
const moment_1 = require("../../externalApis/moment");
const logger_1 = __importDefault(require("../../logger"));
/**
 * Parse News API articles to display on facebook messenger list template.
 * @param items Array of items to be parsed.
 */
const parseArticles = (items) => {
    let elements = [], i = 0;
    if (items.length > 4) {
        logger_1.default.error('Trying to send list template message with more than 4 articles');
    }
    for (const item of items) {
        elements[i] = {};
        elements[i].title = item.title;
        elements[i].subtitle =
            `${idx_1.default(item, (_) => _.source.name)}\n${moment_1.formatTimeForListTemplate(item.publishedAt)}`;
        elements[i].image_url = item.urlToImage;
        elements[i].buttons = [{
                title: 'View',
                type: 'web_url',
                url: item.url,
                webview_height_ratio: 'tall',
            }];
        i++;
    }
    return elements;
};
exports.parseArticles = parseArticles;
//# sourceMappingURL=parser.js.map