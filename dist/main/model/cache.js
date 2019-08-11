"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cache_1 = __importDefault(require("node-cache"));
const environment_1 = require("../environment");
const logger_1 = __importDefault(require("../logger"));
const numericCacheDuration = parseInt(environment_1.CACHE_DURATION) + 10;
class Cache {
    constructor(UserDB) {
        /**
        * Flush all data
        * @returns void
        */
        this.flush = () => {
            this.cache.flushAll();
        };
        /**
        * Close the cache
        * @returns void
        */
        this.close = () => {
            logger_1.default.warn('Closing cache', Cache.name);
            this.cache.close();
        };
        /**
        * Try to get user from cache. If not retrieve user from database
        * @param id id of user
        * @return promise that contains the user
        */
        this.getUser = (ctx) => __awaiter(this, void 0, void 0, function* () {
            try {
                const account = yield this.get(ctx.id);
                if (account !== undefined) {
                    return account;
                }
                return yield this.UserDB.findOrCreateUser(ctx);
            }
            catch (e) {
                return Promise.reject(e);
            }
        });
        /**
        * Save user to cache
        * @param id id of user
        * @param user user object
        * @return
        */
        this.saveUser = (id, user) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.save(id, user);
            }
            catch (e) {
                return Promise.reject(e);
            }
        });
        /**
        * Save data to cache. Successful if returned 'OK'
        * @param {string} key
        * @param {dawn.Context} data
        */
        this.save = (key, data) => {
            return new Promise((resolve, reject) => {
                if (!key)
                    reject('Missing key');
                else if (!data)
                    reject('Missing data');
                else {
                    this.cache.set(key, data, (err, success) => {
                        if (err)
                            reject(err);
                        else if (!err && success)
                            resolve();
                    });
                }
            });
        };
        /**
        * Get data from cache. Return undefined if data not found.
        * @param {string} key
        */
        this.get = (key) => {
            return new Promise((resolve, reject) => {
                if (!key)
                    reject('Missing key');
                else {
                    this.cache.get(key, (err, value) => {
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
        this.cache = new node_cache_1.default({ stdTTL: numericCacheDuration, checkperiod: numericCacheDuration });
        this.UserDB = UserDB;
        this.cache.on('expired', (key, value) => {
            try {
                logger_1.default.info('Account in cache expiring, saving to database', false, Cache.name);
                this.UserDB.updateUser(key, value);
            }
            catch (e) {
                logger_1.default.error(e);
            }
        });
    }
}
exports.default = Cache;
//# sourceMappingURL=cache.js.map