const CODEFORCE_API = 'http://codeforces.com/api/user.info?handles=';
import {
	externalAPIRequest
} from '../utils/request';
/**
 * Get user rating
 * @param {string} handle handle of codeforce user
 * @return {Promise<CodeforceRanking>} promise containing the ranking
 */
const getUserRating = async (handle: string): Promise<CodeforceRanking> => {
	try {
		const res = await externalAPIRequest({
			uri: CODEFORCE_API + handle,
		});
		const result = JSON.parse(res).result[0];
		return {
			rating: result.rating,
			rank: result.rank,
		};

	} catch (e) {
		return Promise.reject(e);
	}
};

export {
	getUserRating,
};
