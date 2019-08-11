import { randomConfusedMessage } from '../lib/string';
import {
	tlgDocument as document,
	tlgImage as image,
	tlgMessage as message,
} from './api';
/**
* Respond in telegram
* @param {dawn.Context} user
*/
export default async (ctx: dawn.Context): Promise<void> => {
	try {
		const {
            chat_id,
            message_id,
        } = ctx.chat;
        const response = ctx.response;
		if (response.text && response.image && response.text.length == response.image.length) {
            for (let i = 0; i < response.text.length; ++i) {
                await message(chat_id, response.text[i]);
                await image(chat_id, response.image[i]);
            }
            return;
        } 
        if (response.text) {
            for (let txt of response.text) {
                await message(chat_id, txt, true, message_id);
            }
            return;
        }
        if (response.image) {
            for (let img of response.image) {
                await document(chat_id, img);
            }
            return;
		} 
	} catch (e) {
		return Promise.reject(e);
	}
};
