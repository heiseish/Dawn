"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = __importDefault(require("request"));
const CODEFORCE_API = 'http://codeforces.com/api/user.info?handles=';
/**
 * Get user rating
 * @param {string} handle handle of codeforce user
 * @return {Promise<CFRanking>} promise containing the ranking
 */
const getUserRating = (handle) => {
    return new Promise((resolve, reject) => {
        request_1.default(CODEFORCE_API + handle, (error, res, body) => {
            try {
                const result = JSON.parse(body);
                if (error)
                    reject(error);
                const user = result.result[0];
                const res = {
                    rating: user.rating,
                    rank: user.rank,
                };
                resolve(res);
            }
            catch (e) {
                reject(e);
            }
        });
    });
};
exports.getUserRating = getUserRating;
//# sourceMappingURL=codeforce.js.map