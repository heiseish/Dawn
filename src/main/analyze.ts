import idx from 'idx';
import { predict } from './3rdparty/@google/tensorflow/intentClassification';
import Logger from './logger';
const CLASSIFY_CONFIDENCE_THRESHOLD = 0.9;
const UNKNOWN_INTENT='unknown';
import _ from 'lodash/core';
/**
* Return the text or document along with the intent of the message
* @param {supportedPlatform} platform
* @param {any} payload
* @param {dawn.Context} user
* @return updated user
*/
export default async (ctx: dawn.Context): Promise<dawn.Context> => {
	const log = Logger.info('Analyzing...', true);
	try {
		if (ctx.document) {
            ctx.entity = 'document';
        }
        if (ctx.text) {
            ctx.text = reformat(ctx.text);
            ctx.entity = await findIntent(ctx.text);
        }
		return ctx;
	} catch (e) {
		return Promise.reject(e);
	} finally {
		log.stop('Analyzed.');
	}
};


/**
* Find the intent in the text message from the convo
* @param {string} text
* @return intent of the text
*/
const findIntent = async (text: string): Promise<string> => {
	try {
		const result = await predict(text);
		let {
			intent,
			confidence,
		} = result;
		intent = confidence >= CLASSIFY_CONFIDENCE_THRESHOLD ? intent : UNKNOWN_INTENT;
		return intent;
	} catch (e) {
		return Promise.reject(e);
	}

};

/**
 * strim text to prevent the link being sent to RNN server
 * @param text Text to be formatted
 * @returns formatted text
 */
const reformat = (text: string): string => {
	text = text.replace('/', ' ');
	text = text.replace('https:', '');
	return text;
};
