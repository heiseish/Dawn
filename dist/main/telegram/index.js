"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
process.env.NTBA_FIX_319 = '1';
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
exports.moduleBot = node_telegram_bot_api_1.default;
const environment_1 = require("../environment");
if (!environment_1.TELEGRAM_TOKEN) {
    throw new Error('missing telegram token');
}
const telegramEndpoint = new node_telegram_bot_api_1.default(environment_1.TELEGRAM_TOKEN, { polling: true });
exports.telegramEndpoint = telegramEndpoint;
//# sourceMappingURL=index.js.map