import {
	externalAPIRequest
} from '../utils/request';
const CODEFORCE_API = 'http://codeforces.com/api/user.info?handles=';
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
        console.log(res);
		const result = res.result[0];
		return {
			rating: parseInt(result.rating),
			rank: result.rank,
		};

	} catch (e) {
		return Promise.reject(e);
	}
};

export {
	getUserRating,
};
