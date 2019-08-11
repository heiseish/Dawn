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
const geocoder_1 = __importDefault(require("geocoder"));
const giphy_1 = __importDefault(require("../3rdparty/giphy"));
class Document {
    constructor() {
        this.name = 'sendDocument';
        /**
         * Handle document from messenger
         * @param {dawn.Context} user
         * @return updated user
         * @throws if gif api or geocoder api fails
         */
        this.execute = (user) => __awaiter(this, void 0, void 0, function* () {
            try {
                switch (user.document.type) {
                    case 'image':
                        const res = yield giphy_1.default();
                        user.response = {
                            image: [res],
                        };
                        break;
                    case 'video':
                        user.response = {
                            text: ['Nice video!'],
                        };
                        break;
                    case 'location':
                        geocoder_1.default.reverseGeocode(user.location.lat, user.location.long, (err, data) => {
                            if (err) {
                                return Promise.reject(err);
                            }
                            if (data.result && data.result.length > 0 && data.result[0].formattedAddress) {
                                user.location.formattedAddress = data.result[0].formattedAddress;
                            }
                            user.response = {
                                text: ['I see that you are @ ' + user.location.formattedAddress + ' right now!'],
                            };
                        });
                        break;
                    case 'QUICK_REPLY':
                        break;
                    case 'audio':
                        user.response = {
                            text: ['Nice voice!'],
                        };
                        break;
                }
                return user;
            }
            catch (e) {
                return Promise.reject(e);
            }
        });
    }
}
exports.default = Document;
//# sourceMappingURL=sendDocument.js.map