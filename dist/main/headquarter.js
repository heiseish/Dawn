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
const getUser_1 = __importDefault(require("./getUser"));
const logger_1 = __importDefault(require("./logger"));
const respond_1 = __importDefault(require("./respond"));
const cache_1 = __importDefault(require("./model/cache"));
const sweeper_1 = __importDefault(require("./sweeper"));
class Headquarter {
    constructor() {
        this.setUserDB = (user) => {
            this.sweeper = new sweeper_1.default();
            this.cache = new cache_1.default(user);
            this.sweeper.add(this.cache.close);
        };
    }
    /**
     * Process request
     * @param ctx
     * @param cache
     */
    receive(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info('Transfering event to headquarter..', false, Headquarter.name);
            try {
                let user = yield getUser_1.default(ctx, this.cache);
                user = yield analyze_1.default(ctx);
                user = yield execute_1.default(ctx);
                yield respond_1.default(ctx);
                this.cache.saveUser(user.id, user);
            }
            catch (err) {
                logger_1.default.error(err);
            }
            finally {
                logger_1.default.separator();
            }
        });
    }
}
exports.default = Headquarter;
//# sourceMappingURL=headquarter.js.map