"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CacheProvider = __importStar(require("../externalApis/node-cache"));
const logger_1 = __importDefault(require("../logger"));
const mongoDB_1 = require("./mongoDB");
CacheProvider.myCache.on('expired', (key, value) => {
    try {
        logger_1.default.info('Account in cache expiring, saving to database..');
        mongoDB_1.UserDB.updateUser(key, value);
    }
    catch (e) {
        logger_1.default.error(e);
    }
});
/**
 * Try to get user from cache. If not retrieve user from database
 * @param id id of user
 * @return promise that contains the user
 */
const getUser = (id) => __awaiter(this, void 0, void 0, function* () {
    try {
        const account = yield CacheProvider.get(id);
        if (account !== undefined) {
            return account;
        }
        else {
            const user = yield mongoDB_1.UserDB.findUser(id);
            if (user) {
                return typeof user.toObject === 'function' ? user.toObject() : user;
            }
            else {
                return null;
            }
        }
    }
    catch (e) {
        return Promise.reject(e);
    }
});
exports.getUser = getUser;
/**
 * Save user to cache
 * @param id id of user
 * @param user user object
 * @return promise that contains the response YES if succeeded. NO otherwise.
 */
const saveUser = (id, user) => __awaiter(this, void 0, void 0, function* () {
    try {
        user = typeof user.toObject === 'function' ? user.toObject() : user;
        return yield CacheProvider.save(id, user);
    }
    catch (e) {
        return Promise.reject(e);
    }
});
exports.saveUser = saveUser;
//# sourceMappingURL=cache.js.map