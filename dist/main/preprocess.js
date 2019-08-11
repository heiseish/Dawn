"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const preprocess_1 = __importDefault(require("./messenger/preprocess"));
const preprocess_2 = __importDefault(require("./telegram/preprocess"));
const preprocess = {
    'telegram': preprocess_2.default,
    'messenger': preprocess_1.default
};
exports.default = (platform) => preprocess[platform];
//# sourceMappingURL=preprocess.js.map