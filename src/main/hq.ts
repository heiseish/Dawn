import analyze from './analyze';
import execute from './execute';
import getUser from './getUser';
import identifySource from './identifySource';
import Logger from './logger';
import respond from './respond';

import Cache from './model/cache';

export default class Headquarter {
	/**
	 * Handle receving events
	 * @param platform platforms currently supported
	 * @param payload message payload from user
	 * @param UserDb Mongoose DB User schema
	 * @param cache Cache server
	 * @throws Error if any errors with child processes
	 */
	async receive(platform: supportedPlatform, payload: any, UserDb: userType, cache: Cache): Promise<void | Error> {
		Logger.info('Transfering event to headquarter..');
		try {
			const partialUniqueId: string = identifySource(platform, payload);
			let user = await getUser(partialUniqueId, platform, payload, UserDb, cache);
			user = await analyze(platform, payload, user);
			user = await execute(platform, payload, user);
			await respond(platform, payload, user);
			cache.saveUser(user.id, user);
		} catch (err) {
			Logger.error(err);
		} finally {
			Logger.separator();
		}
	}
}
