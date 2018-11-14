/**
* Only reply to private IM or group message that tag the bot
* @param {any} msg
* @return a string if message is valid or null
*/
export default (msg: any): string | null => {
	if (msg.from.id === msg.chat.id
		|| msg.text.indexOf('@openAImatchThis_bot') !== -1) {
			return msg.text.replace('@openAImatchThis_bot ', '')
	}
	else return null
}
	