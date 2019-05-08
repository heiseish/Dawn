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
const node_schedule_1 = __importDefault(require("node-schedule"));
const _nasa_1 = __importDefault(require("../externalApis/@nasa"));
const logger_1 = __importDefault(require("../logger"));
const _1 = __importDefault(require("./"));
class MorningNasa {
    constructor() {
        this.stopStreaming = () => {
            logger_1.default.warn('Terminating morning NASA job');
            this.scheduler.cancel();
        };
    }
    /**
     * Schedule a job @8.30 am every day to send daily nasa picture
     * @param list list of person to send message to
     */
    startStreaming(list) {
        this.scheduler = node_schedule_1.default.scheduleJob('30 08 * * *', () => __awaiter(this, void 0, void 0, function* () {
            const nasa = yield _nasa_1.default();
            _1.default({
                text: nasa.explanation,
                image: nasa.url,
            }, list);
        }));
    }
}
exports.default = MorningNasa;
//# sourceMappingURL=morningNasa.js.map