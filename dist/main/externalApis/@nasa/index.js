"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = __importDefault(require("request"));
const environment_1 = require("../../environment");
const NASA_API_URL = 'https://api.nasa.gov/planetary/apod?api_key=' + environment_1.NASA_APIKEY;
/**
 * @returns an object returned by nasa api
 * @throws error if json not valid or API not accessible
 */
const getDailyNasaNews = () => {
    return new Promise((resolve, reject) => {
        request_1.default(NASA_API_URL, (error, res, body) => {
            if (error)
                return Promise.reject(error);
            try {
                const result = JSON.parse(body);
                resolve(result);
            }
            catch (e) {
                return Promise.reject(e);
            }
        });
    });
};
exports.default = getDailyNasaNews;
//# sourceMappingURL=index.js.map