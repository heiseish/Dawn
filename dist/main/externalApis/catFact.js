"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = __importDefault(require("request"));
const catFactUrl = 'https://catfact.ninja/fact';
/**
 * Retrieve a random cat from cat fact API
 */
exports.default = () => {
    return new Promise((response, reject) => {
        request_1.default(catFactUrl, (error, res, body) => {
            try {
                const result = JSON.parse(body);
                if (error)
                    reject(error);
                else if (result.fact.length >= 320) {
                    response('Cat is an animal😺');
                }
                else {
                    let fact = result.fact[0].toLowerCase() + result.fact.substring(1);
                    fact = fact.substring(0, fact.length - 1);
                    response(`Do you know that ${fact}?`);
                }
            }
            catch (e) {
                return Promise.reject(e);
            }
        });
    });
};
//# sourceMappingURL=catFact.js.map