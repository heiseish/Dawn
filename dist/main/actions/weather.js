"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const weather_1 = require("../externalApis/weather");
/**
 * Inform user of the current weather
 * @param {userType} user
 * @return PRomise containing updated user
 */
exports.default = (user) => {
    return new Promise((resolve, reject) => {
        weather_1.getWeatherMessage().then(({ current, summary, imageId }) => {
            user.response = {
                simpleText: current + summary,
                image: imageId,
                answerable: true,
            };
            resolve(user);
        }).catch((err) => {
            reject(err);
        });
    });
};
//# sourceMappingURL=weather.js.map