import Forecast from 'forecast';
import { DARKSKY_KEY } from '../environment';

const WHITE_HAVEN_LAT = 1.28891123;
const WHITE_HAVEN_LONG = 103.7768478;
// clear-day, clear-night, rain, snow, sleet, wind, fog, cloudy, partly-cloudy-day, or partly-cloudy-night
const MAP_ICON_TO_PICTURE: {[x: string]: string} = {
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
const forecast: Forecast = new Forecast({
	service: 'darksky',
	key: DARKSKY_KEY,
	units: 'celcius',
	cache: true, // Cache API requests
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
const getWeather = (coordinate: number[]): Promise<any> => {
	return new Promise((response, reject) => {
		if (!DARKSKY_KEY) reject('missing DARKSKY_KEY');
		forecast.get(coordinate, (err, weather) => {
			if (err) {
				reject(err);
			} else {
				response(weather);
			}
		});
	});
};

interface WeatherResponse {
	current: string;
	summary: string;
	imageId: string;
}

/**
 * Get weather message for the bot
 * @param {number[]} params list of coordinates of the position. Expected length 2
 * @returns {WeatherResponse} formatted response about the weather
 */
const getWeatherMessage = (...params: number[]): Promise<WeatherResponse> => {
	return new Promise((response, reject) => {
		if (!DARKSKY_KEY) reject('missing DARKSKY_KEY');
		if (params.length !== 2) reject('Expect 2 params for getWeatherMessage()');

		const coordinate: number[] =
		params.length === 2  ? [params[0], params[1]] : [WHITE_HAVEN_LAT, WHITE_HAVEN_LONG];
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

export  {
	getWeather,
	getWeatherMessage,
};
