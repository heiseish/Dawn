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
const MANUAL_LINK = 'https://gist.github.com/MadaraUCH/522028088e49110b4511d4cabea361f9';
class Help {
    constructor() {
        this.name = 'help';
        /**
         * Reply to good bye message
         * @param {dawn.Context} user
         * @return updated user
         */
        this.execute = (user) => __awaiter(this, void 0, void 0, function* () {
            user.response = {
                text: ['You may find the help manual here: ' + MANUAL_LINK],
            };
            return user;
        });
    }
}
exports.default = Help;
//# sourceMappingURL=help.js.map