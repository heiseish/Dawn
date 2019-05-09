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
const weather_1 = require("../externalApis/weather");
/**
 * Inform user of the current weather
 * @param {userType} user
 * @return PRomise containing updated user
 */
exports.default = (user) => __awaiter(this, void 0, void 0, function* () {
    try {
        let { current, summary, imageId } = yield weather_1.getWeatherMessage();
        user.response = {
            simpleText: current + summary,
            image: imageId,
            answerable: true,
        };
        return user;
    }
    catch (e) {
        return Promise.reject(e);
    }
});
//# sourceMappingURL=weather.js.map