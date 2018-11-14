import getCatFact from '../externalApis/catFact'
import { getRandomHeadlines } from '../externalApis/news'
import { randomIndex } from '../utils/array'
import { randomGreetingPrefix, randomGreetingSuffix} from '../lib/string'

const RANDOM_IMAGE_URL = 'https://picsum.photos/1200/1000/?random'

/**
* Randomize which function to call as suffix
*/
const possibleGreetLines = [
	getCatFact,
	randomGreetingSuffix,
	getRandomHeadlines,
]


/**
 * Greet user
 * @param user user to greet
 * @return promise containing the updated user
 */
export default async (user: userType): Promise<userType> => {
	try {
		let SUFFIX
		const PREFIX = await randomGreetingPrefix(user.name.first)
		SUFFIX = await randomIndex(possibleGreetLines)()
		if (SUFFIX !== null && typeof SUFFIX === 'object') {
			user.response = SUFFIX
		} else if (SUFFIX === 'Here\'s a photo you might like: ') {
			user.response =  {
				simpleText: `${PREFIX} ${SUFFIX}`,
				image: RANDOM_IMAGE_URL,
				answerable: true,

			}
									} else {
			user.response =  {
				simpleText: `${PREFIX} ${SUFFIX}`,
				answerable: true,

			}
									}
		return user
	} catch (e) {
		return Promise.reject(e)
	}

}