import Logger from '../../logger'
import { messaging } from '../fbrequest'

/**
 * Send generic template
 * @param senderId ID of sender
 * @param items array of item to be place in list template
 * @param cb callback function when opt is executed
 */
export default async (senderId: string, items: any[], cb?: (err: any, data: any) => any): Promise<void> => {
	const opts = {
		form: {
			recipient: {
				id: senderId,
			},
			message: {
				attachment: {
					type: 'template',
					payload: {
						template_type: 'list',
						top_element_style: 'large',
						elements: items,
						buttons: [
							{
								title: 'View More',
								type: 'postback',
								payload: 'viewMoreNews',
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
