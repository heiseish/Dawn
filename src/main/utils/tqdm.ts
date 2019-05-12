/* Modified based on https://github.com/jhedin/ntqdm */
import chalk from 'chalk';
/**
* renders progress to a string
* @private
* @param {number} n - iterations completed
* @param {number} total - total iterations to do
* @param {number} elapsed - time taken so fa in ms
* @return {string} the progress bas strings
*/
const MAX_TILES = process.stdout.columns / 2; /* Number of tiles for the progress bar */
const _render = (n: number, total: number, elapsed: number): string => {
	let cent: number = n / total * 100;
	const est: number = Math.max((100 - (cent + 0.000001)) / (cent + 0.0000001) * elapsed, 0);
	const ips: number = n / ((elapsed + 0.000001) / 1000);
	cent = Math.floor(cent);
	let out: string = chalk.blue('|');
	for (let i = 0; i < MAX_TILES; i++) {
		if (i >= Math.round(cent / (100 / MAX_TILES))) {
			out += chalk.blue('-');
		} else {
			out += chalk.blue('#');
		}
	}
	out += chalk.blue('| ' + n + '/' + total + ' ' + chalk.underline(cent.toString()) + '%') +  '[';
	out += chalk.cyan('Elapsed: ' + _formatter(elapsed) + ', ');
	out += chalk.red('Remaining: ' + chalk.underline(_formatter(est)) + ', ');
	out += chalk.magenta(ips.toFixed(2) + ' iters/s') + ']\n';
	return out;
};

/**
* Formats a time in ms to HH:MM:SS, or MM:SS if the time is less than an hour
* @private
* @param {number} msec
* @returns {string} out
*/
const _formatter = (msec: number): string => {
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
function* tqdm<T>(iter: Iterable<T>, par?: tdqm.options): IterableIterator<any> {
	const def: tdqm.options = {
		desc: '',
		minIter: 1,
		minInterval: 500,
		logging: false,
	};
	const params: any = {};
	for (const i in def) {
		params[i] = def[i];
	}
	for (const i in par) {
		params[i] = par[i];
	}
	const start: number = Date.now();
	const now: number = start;
	let n = 0;
	let lastn = 0;
	let elapsed: number;
	let lastElapsed = 0;

	if (!('total' in params)) {
		for (const i of iter) {
			n++;
		}
		params.total = n;
		n = 0;
	}
	const PADDING = '       ';
	console.log( PADDING + chalk.bgCyan(PADDING + chalk.black(chalk.bold(params.desc)) + PADDING));
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
export {
	tqdm
};
