"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const environment_1 = require("../environment");
/**
 * Generate a ranodm gif from Giphi
 */
exports.default = () => {
    const giphy = {
        baseURL: 'https://api.giphy.com/v1/gifs/',
        key: environment_1.GIPHY_KEY,
        tag: 'fail',
        type: 'random',
        rating: 'pg-13',
    };
    return Promise.resolve('https://media.giphy.com/media/duzpaTbCUy9Vu/giphy.gif');
    // return new Promise((resolve, reject) => {
    // 	request({
    // 		uri: giphy.baseURL +
    // 		giphy.type +
    // 		'?api_key=' +
    // 		giphy.key +
    // 		'&tag=' +
    // 		giphy.tag +
    // 		'&rating=' +
    // 		giphy.rating,
    // 		timeout: WAIT_TIME_FOR_EXTERNAL_API,
    // 	}, (error, res, body) => {
    // 		const result = JSON.parse(body);
    // 		if (error) {
    // 			reject(error);
    // 		} else {
    // 			resolve(result.data.image_original_url);
    // 		}
    // 	});
    // });
};
//# sourceMappingURL=giphy.js.map