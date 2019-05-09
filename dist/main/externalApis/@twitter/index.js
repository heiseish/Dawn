"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const twitter_1 = __importDefault(require("twitter"));
const environment_1 = require("../../environment");
const client = new twitter_1.default({
    consumer_key: environment_1.TWITTER_CONSUMER_KEY,
    consumer_secret: environment_1.TWITTER_CONSUMER_SECRET,
    access_token_key: environment_1.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: environment_1.TWITTER_ACCESS_TOKEN_SECRET,
});
exports.client = client;
/**
 * Get twitter status from a twitter user
 * @param screenName twitter handle
 */
const getTwitterStatus = (screenName) => {
    return new Promise((response, reject) => {
        if (!environment_1.TWITTER_CONSUMER_KEY) {
            reject(new Error('missing TWITTER_CONSUMER_KEY'));
        }
        else if (!environment_1.TWITTER_CONSUMER_SECRET) {
            reject(new Error('missing TWITTER_CONSUMER_SECRET'));
        }
        else if (!environment_1.TWITTER_ACCESS_TOKEN_KEY) {
            reject(new Error('missing TWITTER_ACCESS_TOKEN_KEY'));
        }
        else if (!environment_1.TWITTER_ACCESS_TOKEN_SECRET) {
            reject(new Error('missing TWITTER_ACCESS_TOKEN_SECRET'));
        }
        const options = {
            screen_name: screenName,
            count: 4,
        };
        client.get('statuses/user_timeline', options, (error, tweets) => {
            if (error) {
                reject(error);
            }
            response(tweets);
        });
    });
};
exports.getTwitterStatus = getTwitterStatus;
/**
 * Get twitter user
 * @param screenName twitter handler
 */
const checkAndReturnTwitterUser = (screenName) => {
    return new Promise((resolve, reject) => {
        if (!environment_1.TWITTER_CONSUMER_KEY) {
            reject(new Error('missing TWITTER_CONSUMER_KEY'));
        }
        else if (!environment_1.TWITTER_CONSUMER_SECRET) {
            reject(new Error('missing TWITTER_CONSUMER_SECRET'));
        }
        else if (!environment_1.TWITTER_ACCESS_TOKEN_KEY) {
            reject(new Error('missing TWITTER_ACCESS_TOKEN_KEY'));
        }
        else if (!environment_1.TWITTER_ACCESS_TOKEN_SECRET) {
            reject(new Error('missing TWITTER_ACCESS_TOKEN_SECRET'));
        }
        const options = {
            screen_name: screenName,
        };
        client.get('users/lookup', options, (error, data) => {
            if (error) {
                reject(error);
            }
            resolve(data);
        });
    });
};
exports.checkAndReturnTwitterUser = checkAndReturnTwitterUser;
//# sourceMappingURL=index.js.map