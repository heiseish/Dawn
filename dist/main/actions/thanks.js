"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const string_1 = require("../lib/string");
/**
 * Reply to people thanking
 * @param {userType} user
 * @return parsed User
 */
exports.default = (user) => {
    user.response = {
        simpleText: string_1.randomResponseToThanksMessage(user.name.first),
        answerable: true,
    };
    return user;
};
//# sourceMappingURL=thanks.js.map