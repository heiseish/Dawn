"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cache_1 = __importDefault(require("node-cache"));
const environment_1 = require("../environment");
const numericCacheDuration = parseInt(environment_1.CACHE_DURATION);
const myCache = new node_cache_1.default({ stdTTL: numericCacheDuration, checkperiod: numericCacheDuration + 10 });
exports.myCache = myCache;
/**
* Save data to cache. Successful if returned 'OK'
* @param {string} key
* @param {any} data
*/
const save = (key, data) => {
    return new Promise((resolve, reject) => {
        if (!key) {
            reject('Missing key');
        }
        else if (!data) {
            reject('Missing data');
        }
        else {
            myCache.set(key, data, (err, success) => {
                if (err) {
                    reject(err);
                }
                else if (!err && success) {
                    resolve('OK');
                }
            });
        }
    });
};
exports.save = save;
/**
 * Get data from cache. Return undefined if data not found.
 * @param {string} key
 */
const get = (key) => {
    return new Promise((resolve, reject) => {
        if (!key) {
            reject('Missing key');
        }
        else {
            myCache.get(key, (err, value) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(value);
                }
            });
        }
    });
};
exports.get = get;
/**
 * Flush all data
 */
const flush = () => myCache.flushAll();
exports.flush = flush;
/**
 * Close the cache
 */
const close = () => myCache.close();
exports.close = close;
//# sourceMappingURL=node-cache.js.map