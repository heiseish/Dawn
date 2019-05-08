import Logger from '../../logger';
import { messaging } from '../fbrequest';

/**
 * Send generic template
 * @param senderId ID of sender
 * @param text Text to be sent.
 * @param subtitle Subtitle
 * @param urlMedia Link to media
 * @param imageId Facebook ID of the image
 * @param urlButton link that should be invoked when clicking on the buttons
 * @param cb callback function when opt is executed
 */
export default async (senderId: string, text: string, subtitle?: string, urlMedia?: string,
		                    imageId?: string, urlButton?: string, cb?: (err: any, data: any) => any): Promise<void>  => {
	const opts = {
		form: {
			recipient: {
				id: senderId,
			},
			message: {
				attachment: {
					type: 'template',
					payload: {
						template_type: 'generic',
						elements: [
							{
								title: 'Today weather',
								image_url: urlMedia,
								attachment_id: imageId,
								subtitle: 'Hi',
							},
						],
						buttons: [
							{
								type: 'web_url',
								url: urlButton,
								title: 'View More',
							},
						],
					},
				},
				messaging_type: 'RESPONSE',
			},
		},
	};
	messaging(opts, (err, resp, data) => {
		if (err) { Logger.error(err); }
		if (cb) {
			cb(err || (data.error && data.error.message), data);
		}
	});
};
