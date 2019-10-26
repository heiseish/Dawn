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
class Compliment {
    constructor() {
        this.name = 'compliment';
        /**
         * Reply to good bye message
         * @param {dawn.Context} user
         * @return updated user
         */
        this.execute = (user) => __awaiter(this, void 0, void 0, function* () {
            user.response = {
                text: [string_1.randomResponseToComplimentMessage(user.name.first)]
            };
            return user;
        });
    }
}
exports.default = Compliment;
//# sourceMappingURL=compliment.js.map