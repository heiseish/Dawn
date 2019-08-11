import { translate } from './3rdparty/@google/translate';
import Logger from './logger';
import respondMessenger from './messenger/respond';
import respondTelegram from './telegram/respond';
/**
* Respond to original message
* @param {dawn.Context} user
*/
export default async (ctx: dawn.Context): Promise<void> => {
	try {
		const log = Logger.info('Responding...', true);
		ctx = await prepareResponseForSending(ctx);
		switch (ctx.platform) {
			case 'telegram':
			await respondTelegram(ctx);
			break;

			case 'messenger':
			await respondMessenger(ctx);
			break;

			default:

		}
		ctx.response = {/* Sanitize reponse object */};
		log.stop('Responded.');
	} catch (e) {
		return Promise.reject(e);
	}
};

/**
* Sync the language of the response with the locale of the convo
* @param {dawn.Context} user
* @returns {dawn.Context} updated user
*/
const prepareResponseForSending = async (user: dawn.Context): Promise<dawn.Context> => {
	try {
		const response = user.response;
		if (response.text) {
			const responseLang = 'eng';
			if (responseLang !== user.locale) {
                for (let i = 0; i < user.response.text.length; ++i) {
                    user.response.text[i] = await translate(user.response.text[i], user.locale);
                }
			}
		}
		return user;
	} catch (e) {
		return Promise.reject(e);
	}
};
