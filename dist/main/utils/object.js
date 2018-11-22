"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../logger"));
/**
 * Mask an object with an mask.
 * @param target Object to be masked
 * @param mask mask
 * @returns masked results;
 * @throws Error if target is not an object;
 */
const maskObject = (target, mask) => {
    if (!target || !mask)
        throw new Error('maskObject: Argument missing!');
    if (Array.isArray(target) || typeof (target) !== 'object')
        throw new Error('maskObject: Target object must be an object!');
    const res = {};
    for (const key in target) {
        if (mask[key] == true)
            res[key] = target[key];
        else if (typeof target[key] != 'object' && typeof mask[key] != 'boolean')
            logger_1.default.warn('Object ' + target
                + ' at key ' + key + ' is not an object'
                + 'but mask ' + mask + ' at this key is an object');
        else if (typeof target[key] == 'object' && typeof mask[key] == 'object') {
            const val = maskObject(target[key], mask[key]);
            res[key] = val;
        }
    }
    return res;
};
exports.maskObject = maskObject;
//# sourceMappingURL=object.js.map