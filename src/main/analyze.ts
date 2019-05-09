import idx from 'idx';
import { predict } from './externalApis/@google/tensorflow/intentClassification';
import Logger from './logger';
const CLASSIFY_CONFIDENCE_THRESHOLD = 0.9;
import _ from 'lodash/core';
/**
* Return the text or document along with the intent of the message
* @param {supportedPlatform} platform
* @param {any} payload
* @param {userType} user
* @return updated user
*/
export default async (platform: supportedPlatform, payload: any, user: userType): Promise<userType> => {
	const log = Logger.info('Analyzing...', true);
	try {
		const {
			text,
			document,
			sentiment,
		} = getInformationFromMessage(platform, payload);
		if (!_.isEmpty(document)) {
			user.entity.lastIntent = 'sendDocument';
			user.lastDoc = document;
		} else if (text) {
			user.locale = checkLang();
			user.lastText = reformat(text);
			const intent = await findIntent(text);
			if (typeof intent === 'string') {
				user.entity.lastIntent = intent;
				user.entity.sentiment = sentiment;
			} else {
				user.entity.lastIntent = 'unknown';
				user.entity.sentiment = sentiment;
			}
		}
		return user;
	} catch (e) {
		return Promise.reject(e);
	} finally {
		log.stop('Analyzed.');
	}
};

interface Info {
	text: string;
	document?: any;
	sentiment: string;
}
/**
* Get the information from the message sent by user
* @param {supportedPlatform} platform
* @param {any} payload
* @return Info object
*/
const getInformationFromMessage = (platform: supportedPlatform, payload: any): Info => {
	const info: Info = {
		text: null,
		sentiment: 'neutral',
		document: {},
	};
	switch (platform) {
		/* Telegram */
		case 'telegram':
		info.text =  payload.text || null,
		info.sentiment =  'neutral'; /* TODO */
		if (payload.photo)  {
			info.document.type = 'image';
			info.document.payload = payload.photo[0];
		}
		break;

		/* Messager */
		case 'messenger':
		if (idx(payload, (_) => _.message.quick_reply)) {
			const Msgpayload = idx(payload, (_) => _.message.quick_reply.payload) as unknown as string;
			if ( Msgpayload === 'CORRECT_SERVICE' || Msgpayload === 'INCORRECT_SERVICE') {
				info.document = {
					type: 'QUICK_REPLY',
					value: Msgpayload,
				};
			}
		} else if (idx(payload, (_) => _.message.text)) {
			info.text = payload.message.text;

		} else if (idx(payload, (_) => _.message.attachments)) {
			switch (payload.message.attachments[0].type) {
				case 'image':
				info.document = {
					type: 'image',
				};
				break;

				case 'video':
				info.document = {
					type: 'video',
				};
				break;

				case 'audio':
				// message(senderId, await speechToText(payload.message.attachments[0].payload.url))
				info.document = {
					type: 'audio',
				};
				break;

				case 'location':
				info.document = {
					type: 'location',
					lat: idx(payload, (_) => _.message.attachments[0].payload.coordinates.lat),
					long: idx(payload, (_) => _.message.attachments[0].payload.coordinates.long),
				};
				break;
			}
		}
		break;
	}
	return info;
};

/**
* Find the intent in the text message from the convo
* @param {string} text
* @return intent of the text
*/
const findIntent = async (text: string): Promise<string | Error> => {
	try {
		const result = await predict(text);
		let {
			intent,
			confidence,
		} = result;
		intent = confidence >= CLASSIFY_CONFIDENCE_THRESHOLD ? intent : null;
		return intent;
	} catch (e) {
		return Promise.reject(e);
	}

};

/**
* //TODO
*/
const checkLang = (): string => 'en';

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
