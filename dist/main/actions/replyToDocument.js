"use strict";
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
 * @param {userType} user
 * @return updated user
 */
exports.default = (user) => {
    return new Promise((resolve, reject) => {
        switch (user.lastDoc.type) {
            case 'image':
                giphy_1.default()
                    .then((res) => {
                    user.response = {
                        answerable: true,
                        image: res,
                    };
                })
                    .catch((err) => reject(err));
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
                        reject(err);
                    }
                    const lastLocation = typeof user.toObject === 'function' ? user.toObject().lastLocation : user.lastLocation;
                    user.lastLocation = Object.assign({}, lastLocation, { formattedAddress: idx_1.default(data, (_) => _.results[0].formatted_address) });
                    user.response = {
                        simpleText: 'I see that you are @ ' + idx_1.default(data, (_) => _.results[0].formatted_address) + ' right now!',
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
            default:
                resolve(user);
        }
        resolve(user);
    });
};
//# sourceMappingURL=replyToDocument.js.map