import request from 'request'
const CODEFORCE_API = 'http://codeforces.com/api/user.info?handles='

/**
 * Get user rating
 * @param {string} handle handle of codeforce user
 * @return {Promise<CFRanking>} promise containing the ranking
 */
const getUserRating = (handle: string): Promise<CFRanking> => {
	return new Promise((resolve, reject) => {
		request(CODEFORCE_API + handle, (error, res, body) => {
			try {
				const result = JSON.parse(body)
				if (error) reject(error) 
				let user = result.result[0]
				let res = {
					rating: user.rating,
					rank: user.rank
				}
				resolve(res)
			} catch (e) {
				reject(e)
			}

		})
	})
}

export {
	getUserRating
}