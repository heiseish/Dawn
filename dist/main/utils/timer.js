// @flow
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Wait for a certain amount to time to execute some function. Clean up version of setTimeOut
 * @param {number} time Amount of miniseconds to wait
 * @param {function} cb callback function to wait}
 */
const waitToDo = (time, cb) => {
    setTimeout(() => {
        cb();
    }, time);
};
exports.waitToDo = waitToDo;
//# sourceMappingURL=timer.js.map