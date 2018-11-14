import Twitter from 'twitter'
import {
	TWITTER_CONSUMER_KEY,
	TWITTER_CONSUMER_SECRET,
	TWITTER_ACCESS_TOKEN_KEY,
	TWITTER_ACCESS_TOKEN_SECRET,
} from '../../environment'

/**
 * Check if keys are present
 */
if (!TWITTER_CONSUMER_KEY) { 
	throw new Error('missing TWITTER_CONSUMER_KEY') 
} else if (!TWITTER_CONSUMER_SECRET) {
	throw new Error('missing TWITTER_CONSUMER_SECRET')
} else if (!TWITTER_ACCESS_TOKEN_KEY) {
	throw new Error('missing TWITTER_ACCESS_TOKEN_KEY')
} else if (!TWITTER_ACCESS_TOKEN_SECRET) {
	throw new Error('missing TWITTER_ACCESS_TOKEN_SECRET')
}

let client = new Twitter({
	consumer_key: TWITTER_CONSUMER_KEY,
	consumer_secret: TWITTER_CONSUMER_SECRET,
	access_token_key: TWITTER_ACCESS_TOKEN_KEY,
	access_token_secret: TWITTER_ACCESS_TOKEN_SECRET,
})

/**
 * Get twitter status from a twitter user
 * @param screenName twitter handle
 */
const getTwitterStatus = (screenName: string): Promise<any> => {
	return new Promise((response, reject) => {
		const options = {
			screen_name: screenName,
			count: 4,
		}
		client.get('statuses/user_timeline', options, (error, tweets) => {
			if (error) { reject(error) }
			response(tweets)
		})
	})
}

/**
 * Get twitter user
 * @param screenName twitter handler
 */
const checkAndReturnTwitterUser = (screenName: string): Promise<any> => {
	return new Promise((resolve, reject) => {
		const options = {
			screen_name: screenName,
		}
		client.get('users/lookup', options, (error, data) =>  {
			if (error) { reject(error) }
			resolve(data)
		})
	})
}

export {
	getTwitterStatus,
	client,
	checkAndReturnTwitterUser,
}
