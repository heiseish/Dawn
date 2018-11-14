import { getTwitterStatus } from '../externalApis/@twitter'
const POKEMONGO_SCREEN_NAME = '@PokemonGoApp'

/**
 * Get pokemon go tweets for user
 * @param {userType} user
 * @return promise containing the updated response or error
 */
export default async (user: userType): Promise<userType | Error> => {
	try {
		const conf = `Here's the news from ${POKEMONGO_SCREEN_NAME}`
		const tweets = await getTwitterStatus(POKEMONGO_SCREEN_NAME)
		const texts = [conf]
		for (const tweet of tweets) {
			texts.push(tweet.text)
		}
		user.response =  {
			multipleText: texts,
			answerable: true,
		}
		return user

	} catch (e) {
		return Promise.reject(e)
	}
}
