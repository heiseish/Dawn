"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const forecast_1 = __importDefault(require("forecast"));
const environment_1 = require("../environment");
const WHITE_HAVEN_LAT = 1.28891123;
const WHITE_HAVEN_LONG = 103.7768478;
const MY_WEATHER = [WHITE_HAVEN_LAT, WHITE_HAVEN_LONG];
// clear-day, clear-night, rain, snow, sleet, wind, fog, cloudy, partly-cloudy-day, or partly-cloudy-night
const MAP_ICON_TO_PICTURE = {
    'clear-day': '1018927418276670',
    'clear-night': '1018928791609866',
    'rain': '1018929591609786',
    'snow': '1018930251609720',
    'sleet': '1018930598276352',
    'wind': '1018930828276329',
    'fog': '1018931048276307',
    'cloudy': '1018931408276271',
    'partly-cloudy-day': '1018932811609464',
    'partly-cloudy-night': '1018933201609425',
};
// Initialize
const forecast = new forecast_1.default({
    service: 'darksky',
    key: environment_1.DARKSKY_KEY,
    units: 'celcius',
    cache: true,
    ttl: {
        // How long to cache requests. Uses syntax from moment.js: http://momentjs.com/docs/#/durations/creating/
        minutes: 27,
        seconds: 45,
    },
});
/**
 * Return weather object based on coordinate
 * @param {number[]} coordinate
 */
const getWeather = (coordinate) => {
    return new Promise((response, reject) => {
        if (!environment_1.DARKSKY_KEY)
            reject('missing DARKSKY_KEY');
        forecast.get(coordinate, (err, weather) => {
            if (err) {
                reject(err);
            }
            else {
                response(weather);
            }
        });
    });
};
exports.getWeather = getWeather;
/**
 * Get weather message for the bot
 * @param {number[]} params list of coordinates of the position. Expected length 2
 * @returns {WeatherResponse} formatted response about the weather
 */
const getWeatherMessage = (params = MY_WEATHER) => {
    return new Promise((response, reject) => {
        if (!environment_1.DARKSKY_KEY)
            reject('missing DARKSKY_KEY');
        if (params.length !== 2)
            reject('Expect 2 params for getWeatherMessage()');
        const coordinate = params.length === 2 ? [params[0], params[1]] : [WHITE_HAVEN_LAT, WHITE_HAVEN_LONG];
        getWeather(coordinate)
            .then((weather) => {
            response({
                current: `It's ${weather.currently.summary.toLowerCase()}  near your house now! `,
                summary: `In general, it is ${weather.hourly.summary.toLowerCase()} and this week there is ${weather.daily.summary.toLowerCase()}`,
                imageId: MAP_ICON_TO_PICTURE[weather.currently.icon],
            });
        })
            .catch((err) => reject(err));
    });
};
exports.getWeatherMessage = getWeatherMessage;
//# sourceMappingURL=weather.js.map