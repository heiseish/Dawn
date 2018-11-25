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
const logger_1 = __importDefault(require("./logger"));
const graphApi_1 = require("./messenger/api/graphApi");
/**
* Return a partial unique userId from incoming event to identify user
* @param {supportedPlatform} platform supported platform currently
* @param {any} payload
* @return promise contains the updated user
*/
exports.default = (partialUniqueId, platform, payload, UserDB, cache) => __awaiter(this, void 0, void 0, function* () {
    try {
        const user = yield cache.getUser(partialUniqueId);
        if (user) {
            return user;
        }
        else {
            const newUser = yield createNewUser(partialUniqueId, platform, payload);
            yield UserDB.addUser(newUser);
            cache.saveUser(partialUniqueId, newUser);
            return newUser;
        }
    }
    catch (e) {
        return Promise.reject(e);
    }
});
/**
 * Create new user based on the payload
 * @param {string} partialUniqueId
 * @param {supportedPlatform} platform
 * @param {any} payload
 * @return user object
 */
const createNewUser = (partialUniqueId, platform, payload) => __awaiter(this, void 0, void 0, function* () {
    try {
        const log = logger_1.default.info('Creating new user...', true);
        const user = {
            id: partialUniqueId,
            locale: 'eng',
            entity: {
                lastIntent: null,
            },
        };
        let name;
        switch (platform) {
            case 'telegram':
                user.name = {
                    first: payload.from.first_name,
                };
                break;
            case 'messenger':
                name = yield graphApi_1.getUserName(user.id.replace('mes', ''));
                if (name) {
                    const { firstName, lastName } = name;
                    user.name = {
                        first: firstName,
                        last: lastName,
                        full: `${firstName} ${lastName}`,
                    };
                }
                break;
            default:
        }
        log.stop('Created new user.');
        return user;
    }
    catch (e) {
        return Promise.reject(e);
    }
});
//# sourceMappingURL=retrieveOrCreateUser.js.map