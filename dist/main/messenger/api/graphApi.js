"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fbgraph_1 = __importDefault(require("fbgraph"));
const environment_1 = require("../../environment");
fbgraph_1.default.setAccessToken(environment_1.FB_PAGE_TOKEN);
fbgraph_1.default.setVersion('2.6');
/**
 * Get the user first and last name
 * @param sender user id
 * @return promise contains the user name
 */
const getUserName = (sender) => {
    return new Promise((response) => {
        fbgraph_1.default.get(sender, (err, res) => {
            if (err) {
                response(null);
            }
            else {
                response({
                    firstName: res.first_name,
                    lastName: res.last_name,
                });
            }
        });
    });
};
exports.getUserName = getUserName;
//# sourceMappingURL=graphApi.js.map