import {
	telegramEndpoint,
	moduleBot
} from '../';
export default async (chatId: string | number, text: string, reply?: boolean, 
	messageId?: number): Promise<moduleBot.Message> => {
	try {
		if (reply) {
			return await telegramEndpoint.sendMessage(chatId, text, {reply_to_message_id: messageId});
		} else {
			return await telegramEndpoint.sendMessage(chatId, text);
		}
	} catch (e) {
		return Promise.reject(e);
	}

};
