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
const array_1 = require("./utils/array");
const actions_1 = __importDefault(require("./actions"));
const chalk_1 = __importDefault(require("chalk"));
const logger_1 = __importDefault(require("./logger"));
const pytorch_1 = require("./externalApis/@facebook/pytorch/");
/**
* Return a partial unique userId from incoming event to identify user
* @param {supportedPlatform} platform supported platform currently
* @param {any} payload
* @return updated user
*/
exports.default = (platform, payload, user) => __awaiter(this, void 0, void 0, function* () {
    try {
        const log = logger_1.default.info('Executing', true);
        let action;
        switch (platform) {
            case 'telegram':
                action = array_1.containsObjectWithNameAttribute(actions_1.default, user.entity.lastIntent);
                break;
            case 'messenger':
                action = array_1.containsObjectWithNameAttribute(actions_1.default, user.entity.lastIntent);
                break;
            default:
        }
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
        return Promise.reject(e);
    }
});
//# sourceMappingURL=execute.js.map