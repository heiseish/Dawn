import { translate } from './externalApis/@google/translate'
import Logger from './logger'
import respondMessenger from './messenger/respond'
import respondTelegram from './telegram/respond'
/**
* Respond to original message
* @param {supportedPlatform} platform
* @param {any} payload
* @param {userType} user
*/
export default async (platform: supportedPlatform, payload: any, user: userType): Promise<void> => {
	try {
		const log = Logger.info('Responding...', true)
		user = await prepareResponseForSending(user)
		switch (platform) {
			case 'telegram':
			await respondTelegram(payload, user)
			break

			case 'messenger':
			await respondMessenger(user)
			break

			default:

		}
		user.response = {/* Sanitize reponse object */}
		log.stop('Responded.')
	} catch (e) {
		return Promise.reject(e)
	}
}

/**
* Sync the language of the response with the locale of the convo
* @param {userType} user
*/
const prepareResponseForSending = async (user: userType): Promise<userType> => {
	try {
		const response = user.response
		if (response.simpleText) {
			const responseLang = 'eng'
			if (responseLang !== user.locale) {
				user.response = {
					...response,
					simpleText: await translate(response.simpleText, user.locale),
				}
			}
		}
		return user
	} catch (e) {
		return Promise.reject(e)
	}

}
