import request from 'request'
const PYTORCH_SERVER = 'https://converseserver.herokuapp.com/conversation/'

/**
 * conversation if intent classified is unclear
 * @param {string} sentence sentence to be replied back to
 * @return {string} reply to the sentence
 */
const converse = (sentence: string): Promise<string> => {
	return new Promise((response, reject) => {
		request(PYTORCH_SERVER + sentence, async (error, res, body) => {
			if (error) reject(error)
			response(body)
		})
	})
}

export default converse
