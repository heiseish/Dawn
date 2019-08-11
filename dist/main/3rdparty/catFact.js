"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const CAT_FACT_URI = 'https://catfact.ninja/fact';
const request_1 = require("../utils/request");
/**
 * Retrieve a random cat from cat fact API
 * @returns {Promise<string>} promise with cat fact string
 */
exports.default = () => __awaiter(this, void 0, void 0, function* () {
    try {
        const result = yield request_1.externalAPIRequest({ uri: CAT_FACT_URI });
        if (result.fact.length >= 320) {
            return 'Cat is an animal😺';
        }
        else {
            let fact = result.fact[0].toLowerCase() + result.fact.substring(1);
            fact = fact.substring(0, fact.length - 1);
            return `Do you know that ${fact}?`;
        }
    }
    catch (e) {
        return Promise.reject(e);
    }
});
//# sourceMappingURL=catFact.js.map