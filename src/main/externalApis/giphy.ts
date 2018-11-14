import request from 'request'
/**
 * Generate a ranodm gif from Giphi
 */
export default (): Promise<string> => {
	const giphy = {
		baseURL: 'https://api.giphy.com/v1/gifs/',
		key: 'dc6zaTOxFJmzC',
		tag: 'fail',
		type: 'random',
		rating: 'pg-13',
	}

	return new Promise((resolve, reject) => {
		request(giphy.baseURL +
			giphy.type +
			'?api_key=' +
			giphy.key +
			'&tag=' +
			giphy.tag +
			'&rating=' +
			giphy.rating, (error, res, body) => {
			const result = JSON.parse(body)
			if (error) { reject(error) } else {
				resolve(result.data.image_original_url)
			}
		})
	})
}