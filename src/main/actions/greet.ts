import getCatFact from '../3rdparty/catFact';
import { getRandomHeadlines } from '../3rdparty/news';
import { randomGreetingPrefix, randomGreetingSuffix} from '../lib/string';
import { randomIndex } from '../utils/array';

const RANDOM_IMAGE_URL = 'https://picsum.photos/1200/1000/?random';

/**
* Randomize which function to call as suffix
*/
const possibleGreetLines = [
	getCatFact,
	randomGreetingSuffix,
	getRandomHeadlines,
];


export default class Greeter implements dawn.Action {
    public name = 'greetings';
    /**
    * Greet user
    * @param user user to greet
    * @return promise containing the updated user
    * @throws error if API fails
    */
    public execute = async (user: dawn.Context): Promise<dawn.Context> => {
        try {
            const PREFIX = await randomGreetingPrefix(user.name.first);
            const SUFFIX = await randomIndex(possibleGreetLines)();
            if (SUFFIX !== null && typeof SUFFIX === 'object') {
                user.response = SUFFIX;
            } else if (SUFFIX === "Here's a photo you might like: ") {
                user.response =  {
                    text: [`${PREFIX} ${SUFFIX}`],
                    image: [RANDOM_IMAGE_URL],
    
                };
            } else {
                user.response =  {
                    text: [`${PREFIX} ${SUFFIX}`],
    
                };
            }
            return user;
        } catch (e) {
            return Promise.reject(e);
        }
    
    };
    description: 'Function to greet user';
}


