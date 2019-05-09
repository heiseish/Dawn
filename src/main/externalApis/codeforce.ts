import request from 'request';
const CODEFORCE_API = 'http://codeforces.com/api/user.info?handles=';
import {
	WAIT_TIME_FOR_EXTERNAL_API
} from '../environment';
/**
 * Get user rating
 * @param {string} handle handle of codeforce user
 * @return {Promise<CFRanking>} promise containing the ranking
 */
const getUserRating = (handle: string): Promise<CodeforceRanking> => {
	return new Promise((resolve, reject) => {
		request({
			uri: CODEFORCE_API + handle,
			timeout: WAIT_TIME_FOR_EXTERNAL_API
		}
			, (error, res, body) => {
			try {
				const result = JSON.parse(body);
				if (error) reject(error);
				const user = result.result[0];
				const res = {
					rating: user.rating,
					rank: user.rank,
				};
				resolve(res);
			} catch (e) {
				reject(e);
			}

		});
	});
};

export {
	getUserRating,
};
