import Logger from '../../logger';
import { messaging } from '../fbrequest';

/**
 * Send Media template
 * @param senderId ID of sender
 * @param msg Media to sent
 * @param cb callback function when opt is executed
 */
export default async (senderId: string, msg: string, cb?: (err: any, data: any) => any): Promise<void>  => {
	const opts = {
		form: {
			recipient: {
				id: senderId,
			},
			message: {
				text: msg,
			},
			messaging_type: 'RESPONSE',
		},
	};
	messaging(opts, (err, resp, data) => {
		if (err) { Logger.error(err); }
		if (cb) {
			cb(err || (data.error && data.error.message), data);
		}
	});
};
