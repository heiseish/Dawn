"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Modified based on https://github.com/jhedin/ntqdm */
const chalk_1 = __importDefault(require("chalk"));
/**
* renders progress to a string
* @private
* @param {number} n - iterations completed
* @param {number} total - total iterations to do
* @param {number} elapsed - time taken so fa in ms
* @return {string} the progress bas strings
*/
const MAX_TILES = process.stdout.columns / 2; /* Number of tiles for the progress bar */
const _render = (n, total, elapsed) => {
    let cent = n / total * 100;
    const est = Math.max((100 - (cent + 0.000001)) / (cent + 0.0000001) * elapsed, 0);
    const ips = n / ((elapsed + 0.000001) / 1000);
    cent = Math.floor(cent);
    let out = chalk_1.default.blue('|');
    for (let i = 0; i < MAX_TILES; i++) {
        if (i >= Math.round(cent / (100 / MAX_TILES))) {
            out += chalk_1.default.blue('-');
        }
        else {
            out += chalk_1.default.blue('#');
        }
    }
    out += chalk_1.default.blue('| ' + n + '/' + total + ' ' + chalk_1.default.underline(cent.toString()) + '%') + '[';
    out += chalk_1.default.cyan('Elapsed: ' + _formatter(elapsed) + ', ');
    out += chalk_1.default.red('Remaining: ' + chalk_1.default.underline(_formatter(est)) + ', ');
    out += chalk_1.default.magenta(ips.toFixed(2) + ' iters/s') + ']\n';
    return out;
};
/**
* Formats a time in ms to HH:MM:SS, or MM:SS if the time is less than an hour
* @private
* @param {number} msec
* @returns {string} out
*/
const _formatter = (msec) => {
    let out = '';
    let sec = Math.floor(msec / 1000);
    let min = Math.floor(sec / 60);
    const hour = Math.floor(min / 60);
    sec = sec - min * 60;
    min = min - hour * 60;
    if (hour > 0) {
        if (hour < 10) {
            out = '0';
        }
        out += hour.toString() + ':';
    }
    if (min < 10) {
        out += '0';
    }
    out += min.toString() + ':';
    if (sec < 10) {
        out += '0';
    }
    out += sec.toString();
    return out;
};
/**
* Adds a timed progress bar to iterables
* @param {Iterable} iter
* @param {Object} par - The optional parameters
* @param {string} par.desc - A desciption string to add before the progress bar
* @param {number} par.total - The number of iterations to complete, needed for infinite iterables
* @param {number} par.minIter - The minimum number of iterations between progress bar updates
* @param {number} par.minInterval - The minimum amount of time between progress bar updates
* @param {Boolean} par.logging - whether to output as a log, or update the same line
* @returns Iterable iterator
*/
function* tqdm(iter, par) {
    const def = {
        desc: '',
        minIter: 1,
        minInterval: 500,
        logging: false,
    };
    const params = {};
    for (const i in def) {
        params[i] = def[i];
    }
    for (const i in par) {
        params[i] = par[i];
    }
    const start = Date.now();
    const now = start;
    let n = 0;
    let lastn = 0;
    let elapsed;
    let lastElapsed = 0;
    if (!('total' in params)) {
        for (const i of iter) {
            n++;
        }
        params.total = n;
        n = 0;
    }
    const PADDING = '       ';
    console.log(PADDING + chalk_1.default.bgCyan(PADDING + chalk_1.default.black(chalk_1.default.bold(params.desc)) + PADDING));
    // put an initial bar out
    process.stdout.write(_render(0, params.total, 0));
    // iterations
    for (const i of iter) {
        yield i;
        n++;
        elapsed = Date.now() - start;
        if (n == params.total || (n - lastn >= params.minIter && elapsed - lastElapsed >= params.minInterval)) {
            lastn = n;
            lastElapsed = elapsed;
            if (params.logging) {
                process.stdout.write('\u001b[1F\u001b[2K');
            }
            process.stdout.write(_render(n, params.total, elapsed));
        }
        if (n > params.total) {
            break;
        }
    }
}
exports.tqdm = tqdm;
//# sourceMappingURL=tqdm.js.map