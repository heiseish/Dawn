import bot from '../'
export default async (chatId: string | number, url: string | Buffer, reply?: boolean, messageId?: string | number): Promise<void | Error> => {
	try {
		if (reply) { 
			return await bot.sendPhoto(chatId, url, {
				reply_to_message_id: messageId
			}) 
		} else return await bot.sendPhoto(chatId, url)
	} catch (e) {
		return Promise.reject(e)
	}
}
