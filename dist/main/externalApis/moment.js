"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const getNingOfTheDay = () => {
    const now = parseInt(moment_timezone_1.default()
        .tz('Asia/Singapore')
        .format('H'));
    if (now < 12)
        return 'morning';
    else if (now < 18)
        return 'afternoon';
    else
        return 'evening';
};
exports.getNingOfTheDay = getNingOfTheDay;
const formatTimeForListTemplate = (time) => {
    return moment_timezone_1.default(time, 'YYYY-MM-DDTHH:mm:ssZ').format('MMMM Do YYYY');
};
exports.formatTimeForListTemplate = formatTimeForListTemplate;
//# sourceMappingURL=moment.js.map