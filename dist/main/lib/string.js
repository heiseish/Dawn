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
const array_1 = require("../utils/array");
const moment_1 = require("../externalApis/moment");
/**
 * Handle unknown queries
 * @param name user name
 */
const randomConfusedMessage = (name) => {
    const prefixes = [
        'Hmmmm  ',
        'err.. ',
        'Ayay  ',
    ];
    const suffixes = [
        'I am not really sure about that..',
        'idk',
        'let me think',
    ];
    const n = name ? name : 'friend';
    return `${array_1.randomIndex(prefixes)} ${n}, ${array_1.randomIndex(suffixes)}`;
};
exports.randomConfusedMessage = randomConfusedMessage;
/**
 * Generate good bye message
 * @param name user name
 */
const randomByeMessage = (name) => {
    const suffixes = [
        'Have a good day!',
        'Hope to talk to you again soon mate',
        'Smell ya later ;)',
    ];
    const prefixes = ['Good bye', 'Baii', 'Bye bye', 'Aye aye'];
    const n = name ? name : 'friend';
    return `${array_1.randomIndex(prefixes)}, ${n}! ${array_1.randomIndex(suffixes)}`;
};
exports.randomByeMessage = randomByeMessage;
/**
 * Generate reply to compliment
 * @param name user name
 */
const randomResponseToComplimentMessage = (name) => {
    const suffixes = [
        'I really appreciate it!',
        'I\'m touched..',
        'FeelsGoodMan',
    ];
    const prefixes = ['Thanks', 'Ty', 'woah', 'Aye aye'];
    const n = name ? name : 'friend';
    return `${array_1.randomIndex(prefixes)}, ${n}! ${array_1.randomIndex(suffixes)}`;
};
exports.randomResponseToComplimentMessage = randomResponseToComplimentMessage;
/**
 * Response to thanks
 * @param name user name
 */
const randomResponseToThanksMessage = (name) => {
    const prefixes = ['No problemo', 'Np', 'Aye', 'Aye aye'];
    const suffixes = [
        'Glad I could help!',
        'Hope to be of service again~',
        '¯\\_(ツ)_/¯',
    ];
    const n = name ? name : 'friend';
    return `${array_1.randomIndex(prefixes)}, ${n}! ${array_1.randomIndex(suffixes)}`;
};
exports.randomResponseToThanksMessage = randomResponseToThanksMessage;
/**
 * Greeting suffix
 */
const randomGreetingSuffix = () => {
    const suffixes = ['What\'s up man!~', 'How are you doing!', 'Such a nice day isn\'t it?', 'Here\'s a photo you might like: '];
    return array_1.randomIndex(suffixes);
};
exports.randomGreetingSuffix = randomGreetingSuffix;
/**
 * Greeting prefix
 * @param name user name
 */
const randomGreetingPrefix = (name) => __awaiter(this, void 0, void 0, function* () {
    const prefixes = [
        'Greetings',
        'Yo',
        'Hello',
        `Good ${yield moment_1.getNingOfTheDay()}`,
    ];
    const n = name ? name : 'friend';
    return `${array_1.randomIndex(prefixes)}, ${n}!`;
});
exports.randomGreetingPrefix = randomGreetingPrefix;
const possibleYay = [
    'Yoshhh!',
    'Ez',
    'Hue hue hue',
    'Ye :>',
    'Nice la',
];
exports.possibleYay = possibleYay;
const possibleNay = [
    'Sorry :<',
    'NANI',
    'Mada Mada',
    '...',
];
exports.possibleNay = possibleNay;
//# sourceMappingURL=string.js.map