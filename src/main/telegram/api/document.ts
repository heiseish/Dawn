import {
	moduleBot,
	telegramEndpoint
} from '../';

export default async (chatId: string | number, url: string | Buffer, reply?: boolean,
		                    messageId?: number): Promise<moduleBot.Message> => {
	try {
		if (reply) {
			return await telegramEndpoint.sendDocument(chatId, url, {
				reply_to_message_id: messageId,
			});
		} else {
			return await telegramEndpoint.sendDocument(chatId, url);
		}
	} catch (e) {
		return Promise.reject(e);
	}
};
