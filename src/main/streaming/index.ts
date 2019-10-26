import Logger from '../logger';
import MesMessage from '../messenger/api/message';
import MesSendImage from '../messenger/api/sendImage';
import { tlgImage, tlgMessage }   from '../telegram/api/';

interface StreamableObject {
	text?: string;
	image?: string;
}
/**
*
* @param {StreamableObject} toStream object to stream
* @param {dawn.StreamPerson[]} list list of people to send stream to
*/
const stream = (toStream: StreamableObject, list: dawn.StreamPerson[]): void => {
	for (const user of list) {
		let message, image;
		if (user.platform === 'messenger') {
			message = MesMessage;
			image = MesSendImage;
		} else {
			message = tlgMessage;
			image = tlgImage;
		}
		if (toStream.text) message(user.id, toStream.text);
		if (toStream.image) image(user.id, toStream.image);
	}
};

export default stream;
