"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const idx_1 = __importDefault(require("idx"));
const logger_1 = __importDefault(require("./logger"));
const string_1 = require("./utils/string");
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
/**
 * Return a partial unique userId from incoming event to identify user
 * @param {supportedPlatform} platform supported platform currently
 * @param {any} payload
 */
exports.default = (platform, payload) => {
    const log = logger_1.default.info('Identifying source...', true);
    const data = {
        hashPrefix: '',
        id: '',
    };
    if (payload instanceof node_telegram_bot_api_1.default.Message) {
    }
    switch () {
        case 'telegram':
            data.hashPrefix = 'tlg',
                data.id = payload.from.id;
            ;
            break;
        case 'messenger':
            if (idx_1.default(payload, (_) => _.sender.id)) {
                data.hashPrefix = 'mes',
                    data.id = idx_1.default(payload, (_) => _.sender.id);
            }
            break;
        default:
            data.hashPrefix = 'gia';
            /* need to make Id more deterministic to prevent collision */
            data.id = string_1.generateRandomId();
    }
    log.stop('Indentified Source.');
    return `${data.hashPrefix}${data.id}`;
};
//# sourceMappingURL=identifySource.js.map