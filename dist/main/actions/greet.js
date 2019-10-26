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
const catFact_1 = __importDefault(require("../3rdparty/catFact"));
const news_1 = require("../3rdparty/news");
const string_1 = require("../lib/string");
const array_1 = require("../utils/array");
const RANDOM_IMAGE_URL = 'https://picsum.photos/1200/1000/?random';
/**
* Randomize which function to call as suffix
*/
const possibleGreetLines = [
    catFact_1.default,
    string_1.randomGreetingSuffix,
    news_1.getRandomHeadlines,
];
class Greeter {
    constructor() {
        this.name = 'greetings';
        /**
        * Greet user
        * @param user user to greet
        * @return promise containing the updated user
        * @throws error if API fails
        */
        this.execute = (user) => __awaiter(this, void 0, void 0, function* () {
            try {
                const PREFIX = yield string_1.randomGreetingPrefix(user.name.first);
                const SUFFIX = yield array_1.randomIndex(possibleGreetLines)();
                if (SUFFIX !== null && typeof SUFFIX === 'object') {
                    user.response = SUFFIX;
                }
                else if (SUFFIX === "Here's a photo you might like: ") {
                    user.response = {
                        text: [`${PREFIX} ${SUFFIX}`],
                        image: [RANDOM_IMAGE_URL],
                    };
                }
                else {
                    user.response = {
                        text: [`${PREFIX} ${SUFFIX}`],
                    };
                }
                return user;
            }
            catch (e) {
                return Promise.reject(e);
            }
        });
    }
}
exports.default = Greeter;
//# sourceMappingURL=greet.js.map