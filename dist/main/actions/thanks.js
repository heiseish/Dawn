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
/**
 * Reply to people thanking
 * @param {Dawn.userType} user
 * @return parsed User
 */
exports.default = (user) => __awaiter(this, void 0, void 0, function* () {
    user.response = yield {
        simpleText: string_1.randomResponseToThanksMessage(user.name.first),
        answerable: true,
    };
    return user;
});
//# sourceMappingURL=thanks.js.map