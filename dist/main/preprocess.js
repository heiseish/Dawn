"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const preprocess_1 = __importDefault(require("./messenger/preprocess"));
exports.messengerPreprocess = preprocess_1.default;
const preprocess_2 = __importDefault(require("./telegram/preprocess"));
exports.telegramPreprocess = preprocess_2.default;
//# sourceMappingURL=preprocess.js.map