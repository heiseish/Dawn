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
const request_1 = require("../utils/request");
const CODEFORCE_API = 'http://codeforces.com/api/user.info?handles=';
/**
 * Get user rating
 * @param {string} handle handle of codeforce user
 * @return {Promise<CodeforceRanking>} promise containing the ranking
 */
const getUserRating = (handle) => __awaiter(this, void 0, void 0, function* () {
    try {
        const res = yield request_1.externalAPIRequest({
            uri: CODEFORCE_API + handle,
        });
        console.log(res);
        const result = res.result[0];
        return {
            rating: parseInt(result.rating),
            rank: result.rank,
        };
    }
    catch (e) {
        return Promise.reject(e);
    }
});
exports.getUserRating = getUserRating;
//# sourceMappingURL=codeforce.js.map