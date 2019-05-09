import { getTwitterStatus } from '../externalApis/@twitter';
const POKEMONGO_SCREEN_NAME = '@PokemonGoApp';


interface Tweet {
	text:string
}
/**
 * Get pokemon go tweets for user
 * @param {userType} user
 * @return promise containing the updated response or error
 */
export default async (user: userType): Promise<userType> => {
	try {
		const conf:string = `Here's the news from ${POKEMONGO_SCREEN_NAME}`;
		const tweets:Tweet[] = await getTwitterStatus(POKEMONGO_SCREEN_NAME);
		const texts = [conf];
		for (const tweet of tweets) {
			texts.push(tweet.text);
		}
		user.response =  {
			multipleText: texts,
			answerable: true,
		};
		return user;

	} catch (e) {
		return Promise.reject(e);
	}
};
