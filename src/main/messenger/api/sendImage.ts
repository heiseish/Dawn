import { messaging } from '../fbrequest'

/**
 * Send image
 * @param senderId id of user
 * @param url url of the image
 * @param cb callback function
 */
export default async (senderId: string, url: string, cb?: (err: any, data: any) => void): Promise<void>  => {
	const opts = {
		form: {
			recipient: {
				id: senderId,
			},
			message: {
				attachment: {
					type: 'image',
					payload: {
						url,
					},
				},
			},
			messaging_type: 'RESPONSE',
		},
	}
	messaging(opts, (err, resp, data) => {
		if (cb) {
			cb(err || (data.error && data.error.message), data)
		}
	})
}
