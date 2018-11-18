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
const idx_1 = __importDefault(require("idx"));
const logger_1 = __importDefault(require("./logger"));
const string_1 = require("./utils/string");
/**
 * Return a partial unique userId from incoming event to identify user
 * @param {supportedPlatform} platform supported platform currently
 * @param {any} payload
 */
exports.default = (platform, payload) => __awaiter(this, void 0, void 0, function* () {
    const log = logger_1.default.info('Identifying source...', true);
    const data = {
        hashPrefix: '',
        id: '',
    };
    switch (platform) {
        case 'telegram':
            if (idx_1.default(payload, (_) => _.from.id)) {
                data.hashPrefix = 'tlg',
                    data.id = idx_1.default(payload, (_) => _.from.id);
            }
            break;
        case 'messenger':
            if (idx_1.default(payload, (_) => _.sender.id)) {
                data.hashPrefix = 'mes',
                    data.id = idx_1.default(payload, (_) => _.sender.id);
            }
            break;
        default:
            data.hashPrefix = 'gia';
            // need to make Id more deterministic to prevent collision
            data.id = string_1.generateRandomId();
    }
    log.stop('Indentified Source.');
    return `${data.hashPrefix}${data.id}`;
});
//# sourceMappingURL=identifySource.js.map