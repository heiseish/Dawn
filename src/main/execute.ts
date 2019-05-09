import chalk from 'chalk';
import actions from './actions';
import { converse } from './externalApis/@facebook/pytorch/';
import Logger from './logger';
/**
* Return a partial unique userId from incoming event to identify user
* @param {supportedPlatform} platform supported platform currently
* @param {any} payload
* @return updated user
*/
export default async (user: userType): Promise<userType> => {
	const log = Logger.info('Executing', true);
	try {
		const action: Dawn.Action = getAction(actions, user.entity.lastIntent);
		if (action) {
			user = await action.execute(user);
			log.stop('Executed with intent: ' + chalk.blue(user.entity.lastIntent) + '.');
		} else {
			user.response = {
				simpleText: await converse(user.lastText),
				answerable: true,
			};
			log.stop('Executed with normal conversing');
		}
		return user;
	} catch (e) {
		log.stop('Error');
		return Promise.reject(e);
	}

};

/**
 * Check if an  array of objects hay any object that contains a key with a specific attribute value.
 * @param {Dawn.Action[]}} arr
 * @param {string} attribute
 * @param {string} key
 * @return object with key equal to some values, null if there is no such object
 */
const getAction = (arr: Dawn.Action[], attribute: string, key:string = 'name'): Dawn.Action | null => {
	for (const object of arr) {
		if (object[key] === attribute) {
			return object;
		}
	}
	return null;
};
