import { randomConfusedMessage } from '../lib/string';
import {
	tlgDocument,
	tlgImage,
	tlgMessage,
} from './api';
/**
* Respond in telegram
* @param {any} payload
* @param {userType} user
*/
export default async (payload: any, user: Dawn.userType): Promise<void | Error> => {
	try {
		const chat = payload.chat.id;
		const msgId = payload.message_id;
		const response = user.response;

		if (!response.answerable) {
			await tlgMessage(chat, randomConfusedMessage(user.name.first), true, msgId);
			return;
		}
		if (response.simpleText) {
			await tlgMessage(chat, response.simpleText, true, msgId);
			if (response.image) {
				await tlgImage(chat, response.image);
			}
		} else if (response.image) {
			await tlgDocument(chat, response.image);
		} else if (response.cascadeText) {
			for (const i of response.cascadeText) {
				await tlgMessage(chat, i.title + '\n' + i.buttons[0].url);
				await tlgImage(chat, i.image_url);
			}
		} else if (response.multipleText) {
			for (const text of response.multipleText) { await tlgMessage(chat, text); }
		}
	} catch (e) {
		return Promise.reject(e);
	}
};
