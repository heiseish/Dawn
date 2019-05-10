import analyze from './analyze';
import execute from './execute';
import getUser from './getUser';
import identifySource from './identifySource';
import Logger from './logger';
import respond from './respond';

export default class Headquarter {
	/**
	 * Handle receving events
	 * @param platform platforms currently supported
	 * @param payload message payload from user
	 * @param UserDb Mongoose DB User schema
	 * @param cache Cache server
	 * @return Promise<void>
	 * @throws Error if any errors with child processes
	 */
	async receive(platform: supportedPlatform, payload: any, cache: Dawn.Cache): Promise<void> {
		Logger.info('Transfering event to headquarter..', false, Headquarter.name);
		try {
			const partialUniqueId: string = identifySource(platform, payload);
			let user: Dawn.userType = await getUser(partialUniqueId, platform, payload,  cache);
			user = await analyze(platform, payload, user);
			user = await execute(user);
			await respond(platform, payload, user);
			cache.saveUser(user.id, user);
		} catch (err) {
			Logger.error(err);
		} finally {
			Logger.separator();
		}
	}
}
