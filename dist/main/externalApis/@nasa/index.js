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
const environment_1 = require("../../environment");
const NASA_API_URL = 'https://api.nasa.gov/planetary/apod?api_key=' + environment_1.NASA_APIKEY;
const request_1 = require("../../utils/request");
/**
 * @returns an object returned by nasa api
 * @throws error if json not valid or API not accessible
 */
const getDailyNasaNews = () => __awaiter(this, void 0, void 0, function* () {
    try {
        return yield request_1.externalAPIRequest({ uri: NASA_API_URL });
    }
    catch (e) {
        return Promise.reject(e);
    }
});
exports.default = getDailyNasaNews;
//# sourceMappingURL=index.js.map