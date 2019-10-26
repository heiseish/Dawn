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
const weather_1 = require("../3rdparty/weather");
class Weather {
    constructor() {
        this.name = 'weather';
        /**
         * Inform user of the current weather
         * @param {dawn.Context} user
         * @return PRomise containing updated user
         */
        this.execute = (user) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { current, summary, imageId, } = yield weather_1.getWeatherMessage();
                user.response = {
                    text: [current + summary],
                };
                if (user.platform == 'messenger') {
                    user.response.image = [imageId];
                }
                return user;
            }
            catch (e) {
                return Promise.reject(e);
            }
        });
    }
}
exports.default = Weather;
//# sourceMappingURL=weather.js.map