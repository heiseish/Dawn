"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = __importDefault(require("request"));
const environment_1 = require("../environment");
const environment_2 = require("../environment");
/**
 * Generate a ranodm gif from Giphi
 */
exports.default = () => {
    const giphy = {
        baseURL: 'https://api.giphy.com/v1/gifs/',
        key: environment_1.GIPHY_KEY,
        tag: 'fail',
        type: 'random',
        rating: 'pg-13',
    };
    return new Promise((resolve, reject) => {
        request_1.default({
            uri: giphy.baseURL +
                giphy.type +
                '?api_key=' +
                giphy.key +
                '&tag=' +
                giphy.tag +
                '&rating=' +
                giphy.rating,
            timeout: environment_2.WAIT_TIME_FOR_EXTERNAL_API,
        }, (error, res, body) => {
            const result = JSON.parse(body);
            if (error) {
                reject(error);
            }
            else {
                resolve(result.data.image_original_url);
            }
        });
    });
};
//# sourceMappingURL=giphy.js.map