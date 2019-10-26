import Logger from './logger';

/**
* (create) and obtain the user from database
* @param {dawn.Context} ctx
* @return promise contains the updated user
*/
export default async (ctx: dawn.Context, cache: dawn.Cache): Promise<dawn.Context> => {
    let timer = Logger.info('Retrieving user', true, 'Cache')
	try {
		const user = await cache.getUser(ctx);
		return user;
	} catch (e) {
		return Promise.reject(e);
	} finally {
        timer.stop('Retrieved user');
    }
};
