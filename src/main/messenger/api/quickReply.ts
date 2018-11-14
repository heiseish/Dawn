import Logger from '../../logger'
import { messaging } from '../fbrequest'

interface QuickReply {
	content_type: string
	title: string
	payload: string
	image_url: string
}
/**
 * Send Media template
 * @param senderId ID of sender
 * @param msg Media to sent
 * @param quickReplies quick replies options to be displayed
 * @param cb callback function when opt is executed
 */
export default async (senderId: string, msg: string, ...quickReplies: QuickReply[]): Promise<void>  => {
	const opts = {
		form: {
			recipient: {
				id: senderId,
			},
			message: {
				text: msg,
				quick_replies: quickReplies,
			},
			messaging_type: 'RESPONSE',
		},
	}
	messaging(opts, (err) => {
		if (err) { Logger.error(err) }
	})
}
