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
const analyze_1 = __importDefault(require("./analyze"));
const execute_1 = __importDefault(require("./execute"));
const identifySource_1 = __importDefault(require("./identifySource"));
const logger_1 = __importDefault(require("./logger"));
const cache_1 = require("./model/cache");
const respond_1 = __importDefault(require("./respond"));
const retrieveOrCreateUser_1 = __importDefault(require("./retrieveOrCreateUser"));
class Headquarter {
    /**
     * Handle receving events
     * @param platform platforms currently supported
     * @param payload message payload from user
     */
    receive(platform, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info('Transfering event to headquarter..');
            try {
                const partialUniqueId = yield identifySource_1.default(platform, payload);
                let user = yield retrieveOrCreateUser_1.default(partialUniqueId, platform, payload);
                user = yield analyze_1.default(platform, payload, user);
                user = yield execute_1.default(platform, payload, user);
                yield respond_1.default(platform, payload, user);
                yield cache_1.saveUser(user.id, user);
            }
            catch (err) {
                logger_1.default.error(err);
            }
            finally {
                logger_1.default.separator('=====================================');
            }
        });
    }
}
exports.default = Headquarter;
//# sourceMappingURL=hq.js.map