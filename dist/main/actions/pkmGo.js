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
const _twitter_1 = require("../externalApis/@twitter");
const POKEMONGO_SCREEN_NAME = '@PokemonGoApp';
/**
 * Get pokemon go tweets for user
 * @param {Dawn.userType} user
 * @return promise containing the updated response or error
 */
exports.default = (user) => __awaiter(this, void 0, void 0, function* () {
    try {
        const conf = `Here's the news from ${POKEMONGO_SCREEN_NAME}`;
        const tweets = yield _twitter_1.getTwitterStatus(POKEMONGO_SCREEN_NAME);
        const texts = [conf];
        for (const tweet of tweets) {
            texts.push(tweet.text);
        }
        user.response = {
            multipleText: texts,
            answerable: true,
        };
        return user;
    }
    catch (e) {
        return Promise.reject(e);
    }
});
//# sourceMappingURL=pkmGo.js.map