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
const request_promise_1 = __importDefault(require("request-promise"));
const environment_1 = require("../environment");
/**
 * Request API with fixed timeout. Prevent hanging request query
 * @param options Requestion options
 */
const externalAPIRequest = (options) => __awaiter(this, void 0, void 0, function* () {
    options.timeout = environment_1.WAIT_TIME_FOR_EXTERNAL_API;
    options.headers = {
        'User-Agent': 'Request-Promise',
    };
    options.json = true; // Automatically parses the JSON string in the response,
    try {
        let res = yield request_promise_1.default(options);
        return res;
    }
    catch (e) {
        return Promise.reject(e);
    }
});
exports.externalAPIRequest = externalAPIRequest;
//# sourceMappingURL=request.js.map