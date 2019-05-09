import request from 'request';
import {
	GIPHY_KEY,
} from '../environment';
import {
	WAIT_TIME_FOR_EXTERNAL_API
} from '../environment';
/**
 * Generate a ranodm gif from Giphi
 */
export default (): Promise<string> => {
	const giphy = {
		baseURL: 'https://api.giphy.com/v1/gifs/',
		key: GIPHY_KEY,
		tag: 'fail',
		type: 'random',
		rating: 'pg-13',
	};

	return new Promise((resolve, reject) => {
		request({
			uri: giphy.baseURL +
			giphy.type +
			'?api_key=' +
			giphy.key +
			'&tag=' +
			giphy.tag +
			'&rating=' +
			giphy.rating,
			timeout: WAIT_TIME_FOR_EXTERNAL_API
		}, (error, res, body) => {
			const result = JSON.parse(body);
			if (error) {
				reject(error);
			} else {
				resolve(result.data.image_original_url);
			}
		});
	});
};
