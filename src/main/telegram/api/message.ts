import bot from '../'
export default async (chatId: string | number, text: string, reply?: boolean, messageId?: string | number): Promise<void | Error> => {
	try {
		if (reply) { 
			return await bot.sendMessage(chatId, text, {reply_to_message_id: messageId}) 
		} else { 
			return await bot.sendMessage(chatId, text) 
		}
	} catch (e) {
		return Promise.reject(e)
	}

}
