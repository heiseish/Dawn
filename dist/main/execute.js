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
const chalk_1 = __importDefault(require("chalk"));
const actions_1 = __importDefault(require("./actions"));
const pytorch_1 = require("./externalApis/@facebook/pytorch/");
const logger_1 = __importDefault(require("./logger"));
/**
* Return a partial unique userId from incoming event to identify user
* @param {supportedPlatform} platform supported platform currently
* @param {any} payload
* @return updated user
*/
exports.default = (user) => __awaiter(this, void 0, void 0, function* () {
    const log = logger_1.default.info('Executing', true);
    try {
        const action = getAction(actions_1.default, user.entity.lastIntent);
        if (action) {
            user = yield action.execute(user);
            log.stop('Executed with intent: ' + chalk_1.default.blue(user.entity.lastIntent) + '.');
        }
        else {
            user.response = {
                simpleText: yield pytorch_1.converse(user.lastText),
                answerable: true,
            };
            log.stop('Executed with normal conversing');
        }
        return user;
    }
    catch (e) {
        log.stop('Error');
        return Promise.reject(e);
    }
});
/**
 * Check if an  array of objects hay any object that contains a key with a specific attribute value.
 * @param {Dawn.Action[]}} arr
 * @param {string} attribute
 * @param {string} key
 * @return object with key equal to some values, null if there is no such object
 */
const getAction = (arr, attribute, key = 'name') => {
    for (const object of arr) {
        if (object[key] === attribute) {
            return object;
        }
    }
    return null;
};
//# sourceMappingURL=execute.js.map