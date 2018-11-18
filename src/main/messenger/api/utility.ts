import idx from 'idx'
import Logger from '../../logger'
import { uploading } from '../fbrequest'

type media = 'image' | 'video'
/**
 *
 * @param url URL of the media to be uploaded
 * @param type type of media
 */
const uploadMedia = (url?: string, type?: media): Promise<any> => {
	return new Promise((resolve) => {
		if (!url) { resolve(null) }
		const opts = {
			form: {
				message: {
					attachment: {
						type,
						payload: {
							is_reusable: true,
							url,
						},
					},
				},
			},
		}
		uploading(opts, (err, resp) => {
			if (err) { Logger.error(err) }
			resolve(idx(resp, (_) => _.body.attachment_id))
		})
	})
}

export {
	uploadMedia,
}
