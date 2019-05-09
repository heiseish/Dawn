import NodeCache from 'node-cache';
import { CACHE_DURATION } from '../environment';
import Logger from '../logger';

const numericCacheDuration = parseInt(CACHE_DURATION);

export default class Cache implements Dawn.Cache {
	private cache;
	private UserDB;

	constructor(UserDB: any) {
		this.cache = new NodeCache( { stdTTL: numericCacheDuration, checkperiod: numericCacheDuration + 10 });
		this.UserDB = UserDB;
		this.cache.on('expired', (key, value) => {
			try {
				Logger.info('Account in cache expiring, saving to database..');
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
	public flush = (): void => {
		this.cache.flushAll();
	}

	/**
	* Close the cache
	* @returns void
	*/
	public close = (): void => {
		Logger.warn('Closing cache...');
		this.cache.close();
	}

	/**
	* Try to get user from cache. If not retrieve user from database
	* @param id id of user
	* @return promise that contains the user
	*/
	public  getUser = async (id: string): Promise<userType> => {
		try {
			const account = await this.get(id);
			if (account !== undefined) { return account; } else {
				const user = await this.UserDB.findUser(id);
				return user;
			}
		} catch (e) {
			return Promise.reject(e);
		}
	}
	/**
	* Save user to cache
	* @param id id of user
	* @param user user object
	* @return promise that contains the response YES if succeeded. NO otherwise.
	*/
	public  saveUser = async (id: string, user: any): Promise<string> => {
		try {
			return await this.save(id, user);
		} catch (e) {
			return Promise.reject(e);
		}
	}
	/**
	* Save data to cache. Successful if returned 'OK'
	* @param {string} key
	* @param {any} data
	*/
	private save = (key: string, data: any): Promise<string> => {
		return new Promise((resolve, reject) => {
			if (!key) reject('Missing key');
			else if (!data) reject('Missing data');
			else {
				this.cache.set( key, data, ( err, success ) => {
					if (err) reject(err);
					else if ( !err && success ) resolve('OK');
				});
			}
		});
	}

	/**
	* Get data from cache. Return undefined if data not found.
	* @param {string} key
	*/
	private get = (key: string): Promise<any> => {
		return new Promise((resolve, reject) => {
			if (!key) reject('Missing key');
			else {
				this.cache.get( key, (err, value) => {
					if (err) { reject(err); } else { resolve(value); }
				});
			}
		});

	}
}
