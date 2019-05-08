import idx from 'idx';
import Logger from './logger';
import { generateRandomId } from './utils/string';
/**
 * Return a partial unique userId from incoming event to identify user
 * @param {supportedPlatform} platform supported platform currently
 * @param {any} payload
 */
export default (platform: supportedPlatform, payload: any): string => {
	const log = Logger.info('Identifying source...', true);
	const data = {
		hashPrefix: '',
		id: '',
	};
	switch (platform) {
	case 'telegram':
		if (idx(payload, (_) => _.from.id)) {
			data.hashPrefix = 'tlg',
			data.id = idx(payload, (_) => _.from.id) as unknown as string;
		}
		break;

	case 'messenger':
		if (idx(payload, (_) => _.sender.id)) {
			data.hashPrefix = 'mes',
			data.id = idx(payload, (_) => _.sender.id) as unknown as string;
		}
		break;

	default:
		data.hashPrefix = 'gia';
		/* need to make Id more deterministic to prevent collision */
		data.id = generateRandomId();

	}
	log.stop('Indentified Source.');
	return `${data.hashPrefix}${data.id}`;
};
