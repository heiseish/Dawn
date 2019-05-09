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
const environment_1 = require("../../../environment");
const request_promise_1 = __importDefault(require("request-promise"));
const generateDataPackage = (sentence) => ({
    method: 'POST',
    uri: environment_1.CONVERSE_SERVER,
    form: {
        sentence,
    },
});
/**
 * conversation if intent classified is unclear
 * @param {string} sentence sentence to be replied back to
 * @return {string} reply to the sentence
 */
const converse = (sentence) => __awaiter(this, void 0, void 0, function* () {
    try {
        const ans = yield request_promise_1.default(generateDataPackage(sentence));
        return ans;
    }
    catch (e) {
        return Promise.reject(e);
    }
});
exports.default = converse;
//# sourceMappingURL=converse.js.map