"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const natural_1 = __importDefault(require("natural"));
natural_1.default.PorterStemmer.attach();
/**
 * Tokenized text and return an array of stem words
 * NOTE: Quite unreliable
 * @param {string} text
 * @return array of tokenized text
 */
const tokenizeText = (text) => text.toLowerCase().tokenizeAndStem();
exports.tokenizeText = tokenizeText;
/**
  * Right padding s with c to a total of n chars
  * @param {string} s original string
  * @param {string} c character to be padded
  * @param {number} n length
  * @return string with right side padded
  */
const padRight = (s, c, n) => {
    if (!s || !c || s.length >= n) {
        return s;
    }
    const max = (n - s.length) / c.length;
    for (let i = 0; i < max; i++) {
        s += c;
    }
    return s;
};
exports.padRight = padRight;
/**
  * Left padding s with c to a total of n chars
  * @param {string} s original string
  * @param {string} c character to be padded
  * @param {number} n length
  * @return a string with left side padded
  */
const padLeft = (s, c, n) => {
    if (!s || !c || s.length >= n) {
        return s;
    }
    const max = (n - s.length) / c.length;
    for (let i = 0; i < max; i++) {
        s = c + s;
    }
    return s;
};
exports.padLeft = padLeft;
/**
 * Remove all substrings inside a string
 * @param {string} s original string
 * @param {string} substrings substrings to be removed
 * @return a string with all substrings removed
 */
const replaceAllSubstring = (s, ...substrings) => {
    for (const substring of substrings) {
        s = replaceAll(s, substring, '');
    }
    return s;
};
exports.replaceAllSubstring = replaceAllSubstring;
/**
 * Return a numeric substring from a string
 * @param {string} s original strong
 * @param {number} index index of the numeric subtring to be returned. default is 0
 * @return a string that is convertible to a number
 */
const getNumberStringFromString = (s, index) => {
    const i = index ? index : 0;
    return s.match(/\d+/)[i] ? s.match(/\d+/)[i] : s.match(/\d+/)[0] ? s.match(/\d+/)[0] : null;
};
exports.getNumberStringFromString = getNumberStringFromString;
/**
 * Generate a random string of numbers based on length given
 * @param {number} length
 * @return a random string consists of n umber
 */
const generateRandomId = (length = 10) => {
    let text = '';
    const possible = '0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};
exports.generateRandomId = generateRandomId;
/**
 * Replace all occurence of a substring in a string
 * @param {string} str
 * @param {string} find
 * @param {string} replace
 * @return a string will all `find` replaced by `replace`
 */
const replaceAll = (str, find, replace) => {
    return str.replace(new RegExp(find, 'g'), replace);
};
exports.replaceAll = replaceAll;
//# sourceMappingURL=string.js.map