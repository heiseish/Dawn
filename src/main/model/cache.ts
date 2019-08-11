import NodeCache from 'node-cache';
import { CACHE_DURATION } from '../environment';
import Logger from '../logger';
const numericCacheDuration = parseInt(CACHE_DURATION) + 10;

export default class Cache implements dawn.Cache {
	private cache: NodeCache;
	private UserDB: Mongoose.UserDatabase;

	constructor(UserDB: Mongoose.UserDatabase) {
		this.cache = new NodeCache( { stdTTL: numericCacheDuration, checkperiod: numericCacheDuration});
		this.UserDB = UserDB;
		this.cache.on('expired', (key, value) => {
			try {
				Logger.info('Account in cache expiring, saving to database', false, Cache.name);
				this.UserDB.updateUser(key, value);
			} catch (e) {
				Logger.error(e);
			}
		});
	}

	/**
	* Flush all data
	* @returns void
	*/
	flush = (): void => {
		this.cache.flushAll();
	}

	/**
	* Close the cache
	* @returns void
	*/
	close = (): void => {
		Logger.warn('Closing cache', Cache.name);
		this.cache.close();
	}

	/**
	* Try to get user from cache. If not retrieve user from database
	* @param id id of user
	* @return promise that contains the user
	*/
	getUser = async (ctx: dawn.Context): Promise<dawn.Context> => {
		try {
			const account = await this.get(ctx.id);
			if (account !== undefined) {
				return account;
            } 
            return await this.UserDB.findOrCreateUser(ctx);
		} catch (e) {
			return Promise.reject(e);
		}
    }
    
	/**
	* Save user to cache
	* @param id id of user
	* @param user user object
	* @return 
	*/
	saveUser = async (id: string, user: dawn.Context): Promise<void> => {
		try {
			return await this.save(id, user);
		} catch (e) {
			return Promise.reject(e);
		}
	}
	/**
	* Save data to cache. Successful if returned 'OK'
	* @param {string} key
	* @param {dawn.Context} data
	*/
	private save = (key: string, data: dawn.Context): Promise<void> => {
		return new Promise((resolve, reject) => {
			if (!key) reject('Missing key');
			else if (!data) reject('Missing data');
			else {
				this.cache.set( key, data, ( err, success ) => {
					if (err) reject(err);
					else if ( !err && success ) resolve();
				});
			}
		});
	}

	/**
	* Get data from cache. Return undefined if data not found.
	* @param {string} key
	*/
	private get = (key: string): Promise<dawn.Context> => {
		return new Promise((resolve, reject) => {
			if (!key) reject('Missing key');
			else {
				this.cache.get( key, (err, value) => {
					if (err) { 
                        reject(err); 
                    } else { 
                        resolve(<dawn.Context>value); 
                    }
				});
			}
		});

    }
    

}
