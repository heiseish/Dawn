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
const string_1 = require("../lib/string");
class Thanks {
    constructor() {
        this.name = 'thanks';
        /**
         * Reply to people thanking
         * @param {dawn.Context} user
         * @return parsed User
         */
        this.execute = (user) => __awaiter(this, void 0, void 0, function* () {
            user.response = {
                text: [yield string_1.randomResponseToThanksMessage(user.name.first)],
            };
            return user;
        });
    }
}
exports.default = Thanks;
//# sourceMappingURL=thanks.js.map