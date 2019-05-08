import request from 'request';
import { NASA_APIKEY } from '../../environment';

const NASA_API_URL = 'https://api.nasa.gov/planetary/apod?api_key=' + NASA_APIKEY;

interface nasaApiObject {
    copyright?: string;
    date: string;
    explanation: string;
    hdurl: string;  // image url HD
    media_type: 'image' | 'video';
    service_version: 'v1';
    title: string;
    url: string;
}

/**
 * @returns an object returned by nasa api
 * @throws error if json not valid or API not accessible
 */
const getDailyNasaNews =  (): Promise<nasaApiObject> => {
	return new Promise((resolve, reject) => {
		request(NASA_API_URL, (error, res, body) => {
			if (error) return Promise.reject(error);
			try {
				const result = JSON.parse(body);
				resolve(result);
			} catch (e) {
				return Promise.reject(e);
			}

		});
	});
};

export default getDailyNasaNews;
