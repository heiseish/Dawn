import Twitter from 'twitter';
import {
	TWITTER_ACCESS_TOKEN_KEY,
	TWITTER_ACCESS_TOKEN_SECRET,
	TWITTER_CONSUMER_KEY,
	TWITTER_CONSUMER_SECRET,
} from '../../environment';

const client:Twitter = new Twitter({
	consumer_key: TWITTER_CONSUMER_KEY,
	consumer_secret: TWITTER_CONSUMER_SECRET,
	access_token_key: TWITTER_ACCESS_TOKEN_KEY,
	access_token_secret: TWITTER_ACCESS_TOKEN_SECRET,
});
interface Tweet {
	text:string
}
/**
 * Get twitter status from a twitter user
 * @param screenName twitter handle
 */
const getTwitterStatus = (screenName: string): Promise<Tweet[]> => {
	return new Promise((response, reject) => {
		if (!TWITTER_CONSUMER_KEY) {
			reject(new Error('missing TWITTER_CONSUMER_KEY'));
		} else if (!TWITTER_CONSUMER_SECRET) {
			reject(new Error('missing TWITTER_CONSUMER_SECRET'));
		} else if (!TWITTER_ACCESS_TOKEN_KEY) {
			reject(new Error('missing TWITTER_ACCESS_TOKEN_KEY'));
		} else if (!TWITTER_ACCESS_TOKEN_SECRET) {
			reject(new Error('missing TWITTER_ACCESS_TOKEN_SECRET'));
		}

		const options = {
			screen_name: screenName,
			count: 4,
		};
		client.get('statuses/user_timeline', options, (error, tweets:Tweet[]) => {
			if (error) { 
				reject(error); 
			}
			response(tweets);
		});
	});
};

/**
 * Get twitter user
 * @param screenName twitter handler
 */
const checkAndReturnTwitterUser = (screenName: string): Promise<any> => {
	return new Promise((resolve, reject) => {
		if (!TWITTER_CONSUMER_KEY) {
			reject(new Error('missing TWITTER_CONSUMER_KEY'));
		} else if (!TWITTER_CONSUMER_SECRET) {
			reject(new Error('missing TWITTER_CONSUMER_SECRET'));
		} else if (!TWITTER_ACCESS_TOKEN_KEY) {
			reject(new Error('missing TWITTER_ACCESS_TOKEN_KEY'));
		} else if (!TWITTER_ACCESS_TOKEN_SECRET) {
			reject(new Error('missing TWITTER_ACCESS_TOKEN_SECRET'));
		}
		const options = {
			screen_name: screenName,
		};
		client.get('users/lookup', options, (error, data) =>  {
			if (error) { reject(error); }
			resolve(data);
		});
	});
};

export {
	getTwitterStatus,
	client,
	checkAndReturnTwitterUser,
};
