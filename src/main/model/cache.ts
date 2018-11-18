import * as CacheProvider from '../externalApis/node-cache'
import Logger from '../logger'
import { UserDB } from './mongoDB'

CacheProvider.myCache.on('expired', (key, value) => {
	try {
		Logger.info('Account in cache expiring, saving to database..')
		UserDB.updateUser(key, value)
	} catch (e) {
		Logger.error(e)
	}
})

/**
 * Try to get user from cache. If not retrieve user from database
 * @param id id of user
 * @return promise that contains the user
 */
const getUser = async (id: string): Promise<any | Error> => {
	try {
		const account = await CacheProvider.get(id)
		if (account !== undefined) { return account } else {
			const user = await UserDB.findUser(id)
			if (user) {
				return typeof user.toObject === 'function' ? user.toObject() : user
			} else { return null }
		}
	} catch (e) {
		return Promise.reject(e)
	}
}

/**
 * Save user to cache
 * @param id id of user
 * @param user user object
 * @return promise that contains the response YES if succeeded. NO otherwise.
 */
const saveUser = async (id: string, user: any): Promise<string | Error> => {
	try {
		user = typeof user.toObject === 'function' ? user.toObject() : user
		return await CacheProvider.save(id, user)
	} catch (e) {
		return Promise.reject(e)
	}
}

export {
	getUser,
	saveUser,
}
