import Logger from '../logger';
import MesMessage from '../messenger/api/message';
import MesSendImage from '../messenger/api/sendImage';
import { tlgImage, tlgMessage }   from '../telegram/api/';
import { getPlatformAndId } from './../utils/account';

interface StreamableObject {
	text?: string;
	image?: string;
}
/**
*
* @param {StreamableObject} toStream object to stream
* @param {string[]} list list of people to send stream to
*/
const stream = (toStream: StreamableObject, list: string[]): void => {
	for (const userId of list) {
		const {
			platform,
			id,
		} = getPlatformAndId(userId);
		let message, image;
		if (platform === 'messenger') {
			message = MesMessage;
			image = MesSendImage;
		} else {
			message = tlgMessage;
			image = tlgImage;
		}
		if (toStream.text) message(id, toStream.text);
		if (toStream.image) image(id, toStream.image);
	}
};

export default stream;
