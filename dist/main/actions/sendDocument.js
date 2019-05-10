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
const idx_1 = __importDefault(require("idx"));
const giphy_1 = __importDefault(require("../externalApis/giphy"));
const string_1 = require("../lib/string");
const array_1 = require("../utils/array");
/**
 * Handle document from messenger
 * @param {Dawn.userType} user
 * @return updated user
 * @throws if gif api or geocoder api fails
 */
exports.default = (user) => __awaiter(this, void 0, void 0, function* () {
    try {
        switch (user.lastDoc.type) {
            case 'image':
                const res = yield giphy_1.default();
                user.response = {
                    simpleText: null,
                    answerable: true,
                    image: res,
                };
                break;
            case 'video':
                user.response = {
                    answerable: true,
                    simpleText: 'Nice video!',
                };
                break;
            case 'location':
                geocoder_1.default.reverseGeocode(user.lastLocation.lat, user.lastLocation.long, (err, data) => {
                    if (err) {
                        return Promise.reject(err);
                    }
                    const lastLocation = typeof user.toObject === 'function' ? user.toObject().lastLocation : user.lastLocation;
                    const addr = idx_1.default(data, (_) => _.results[0].formatted_address);
                    user.lastLocation = Object.assign({}, lastLocation, { formattedAddress: addr });
                    user.response = {
                        simpleText: 'I see that you are @ ' + addr + ' right now!',
                        answerable: true,
                    };
                });
                break;
            case 'QUICK_REPLY':
                if (user.lastDoc.value === 'INCORRECT_SERVICE') {
                    user.text[user.text.length - 1].correctlyAnswered = false;
                    user.response = {
                        simpleText: array_1.randomIndex(string_1.possibleNay),
                        answerable: true,
                    };
                }
                else {
                    user.response = {
                        simpleText: array_1.randomIndex(string_1.possibleYay),
                        answerable: true,
                    };
                }
                break;
            case 'audio':
                user.response = {
                    answerable: true,
                    simpleText: 'Nice voice!',
                };
                break;
        }
        return user;
    }
    catch (e) {
        return Promise.reject(e);
    }
});
//# sourceMappingURL=sendDocument.js.map