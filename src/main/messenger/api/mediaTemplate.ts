import Logger from '../../logger'
import { messaging } from '../fbrequest'
import { uploadMedia } from './utility'

/**
 * Send Media template
 * @param senderId ID of sender
 * @param media Media to sent
 * @param button Button to show under the media
 * @param cb callback function when opt is executed
 */
export default async (senderId: string, media: MessengerTextMedia, button?: MessengerTextButton, cb?: (err: any, data: any) => any): Promise<void>  => {
	const opts = {
		form: {
			recipient: {
				id: senderId,
			},
			message: {
				attachment: {
					type: 'template',
					payload: {
						template_type: 'media',
						elements: [
							{
								media_type: media.type ? 'image' : 'video',
								attachment_id: media.id || await uploadMedia(media.url, media.type),
								buttons: button ? [
									{
										type: 'web_url',
										url: button.url,
										title: button.title,
									},
								] : null,
							},
						],

					},
				},
			},
			messaging_type: 'RESPONSE',
		},
	}
	messaging(opts, (err, resp, data) => {
		if (err) { Logger.error(err) }
		if (cb) {
			cb(err || (data.error && data.error.message), data)
		}
	})
}
