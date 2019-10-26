import { getTwitterStatus } from '../3rdparty/@twitter';
const POKEMONGO_SCREEN_NAME = '@PokemonGoApp';

interface Tweet {
	text: string;
}

export default class PokemonGo implements dawn.Action {
    public name = 'pkmGO';
    /**
     * Reply to good bye message
     * @param {dawn.Context} user
     * @return updated user
     */
    public execute = async (user: dawn.Context): Promise<dawn.Context> => {
        try {
            const conf = `Here's the news from ${POKEMONGO_SCREEN_NAME}`;
            const tweets: Tweet[] = await getTwitterStatus(POKEMONGO_SCREEN_NAME);
            const texts = [conf];
            for (const tweet of tweets) {
                texts.push(tweet.text);
            }
            user.response =  {
                text: texts
            };
            return user;
    
        } catch (e) {
            return Promise.reject(e);
        }
    };
    
    description: 'Function to get pokemon go tweeter news';
}
