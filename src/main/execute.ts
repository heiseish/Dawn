import { containsObjectWithNameAttribute } from './utils/array'
import actions from './actions'
import chalk from 'chalk'
import Logger from './logger'
import { converse } from './externalApis/@facebook/pytorch/'
/**
* Return a partial unique userId from incoming event to identify user
* @param {supportedPlatform} platform supported platform currently
* @param {any} payload
* @return updated user
*/
export default async (platform: supportedPlatform, payload: any, user: userType): Promise<userType> => {
	try {
		const log = Logger.info('Executing', true)
		let action
		switch (platform) {
		case 'telegram':
			action = containsObjectWithNameAttribute(actions, user.entity.lastIntent)
			break
		case 'messenger':
			action = containsObjectWithNameAttribute(actions, user.entity.lastIntent)
			break
		default:
		}

		if (action) {
			user = await action.execute(user)
			log.stop('Executed with intent: ' + chalk.blue(user.entity.lastIntent) + '.')
		} else {
			user.response = {
				simpleText: await converse(user.lastText),
				answerable: true,
			}
			log.stop('Executed with normal conversing')
		}
		return user
	} catch (e) {
		return Promise.reject(e)
	}

}
