import { messaging } from '../fbrequest'
import Logger from '../../logger'

/**
 * Show typing on animation
 * @param senderId id of user
 * @param cb callback function
 */
const typingOn = async (senderId: string,  cb?: (err: any, data: any) => any): Promise<void> => {
	const opts = {
		form: {
			recipient: {
				id: senderId,
			},
			sender_action: 'typing_on',
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

/**
 * Show typing off animation
 * @param senderId id of user
 * @param cb callback function
 */
const typingOff = async (senderId: string,  cb?: (err: any, data: any) => any): Promise<any>  => {
	const opts = {
		form: {
			recipient: {
				id: senderId,
			},
			sender_action: 'typing_off',
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

/**
 * Show marking seen animation
 * @param senderId id of user
 * @param cb callback function
 */
const markSeen = async (senderId: string,  cb?: (err: any, data: any) => any): Promise<any>  => {
	const opts = {
		form: {
			recipient: {
				id: senderId,
			},
			sender_action: 'mark_seen',
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

export {
	typingOn,
	typingOff,
	markSeen,
}
