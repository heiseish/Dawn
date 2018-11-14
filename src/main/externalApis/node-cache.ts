import NodeCache from 'node-cache'
import { CACHE_DURATION } from '../environment'

const numericCacheDuration = parseInt(CACHE_DURATION)
const myCache = new NodeCache( { stdTTL: numericCacheDuration, checkperiod: numericCacheDuration + 10 } )

/**
* Save data to cache. Successful if returned 'OK'
* @param {string} key
* @param {any} data
*/
const save = (key: string, data: any): Promise<string> => {
	return new Promise((resolve, reject) => {
		if (!key) { reject('Missing key') } else if (!data) { reject('Missing data') } else {
			myCache.set( key, data, ( err, success ) => {
				if (err) { reject(err) } else if ( !err && success ) {
					resolve('OK')
				}
			})
							}
	})

}

/**
 * Get data from cache. Return undefined if data not found.
 * @param {string} key
 */
const get = (key: string): Promise<any> => {
	return new Promise((resolve, reject) => {
		if (!key) { reject('Missing key') } else {
			myCache.get( key, (err, value) => {
				if (err) { reject(err) } else { resolve(value) }
			})
		}
	})

}

/**
 * Flush all data
 */
const flush = (): void => myCache.flushAll()

/**
 * Close the cache
 */
const close = (): void=> myCache.close()

export {
	save,
	get,
	flush,
	myCache,
	close,
}
