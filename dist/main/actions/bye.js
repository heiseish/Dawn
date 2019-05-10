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
 * Reply to good bye message
 * @param {Dawn.userType} user
 * @return updated user
 */
exports.default = (user) => __awaiter(this, void 0, void 0, function* () {
    user.response = {
        simpleText: string_1.randomByeMessage(user.name.first),
        answerable: true,
    };
    return user;
});
//# sourceMappingURL=bye.js.map