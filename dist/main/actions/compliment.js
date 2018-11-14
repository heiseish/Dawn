"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const string_1 = require("../lib/string");
/**
 * Reply to people's compliment
 * @param {userType} user
 * @return updated user
 */
exports.default = (user) => {
    user.response = {
        simpleText: string_1.randomResponseToComplimentMessage(user.name.first),
        answerable: true,
    };
    return user;
};
//# sourceMappingURL=compliment.js.map