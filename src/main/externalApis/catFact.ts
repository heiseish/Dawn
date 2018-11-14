import request from 'request'
const catFactUrl = 'https://catfact.ninja/fact'

/**
 * Retrieve a random cat from cat fact API
 */
export default (): Promise<string> => {
	return new Promise((response, reject) => {
		request(catFactUrl, (error, res, body) => {
			try {
				const result = JSON.parse(body)
				if (error) { reject(error) }
				else if (result.fact.length >= 320) {
					response('Cat is an animal😺')
				} else {
					let fact: string = result.fact[0].toLowerCase() + result.fact.substring(1)
					fact = fact.substring(0, fact.length - 1)
					response(`Do you know that ${fact}?`)
				}
			} catch (e) {
				return Promise.reject(e)
			}

		})
	})
}
