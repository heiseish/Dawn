import Logger from './logger';

export default class Sweeper {
	private list: Function[];
	constructor(list?: Function[]) {
		if (list) this.list = list;
		else this.list = [] as Function[];
		this.sweepWhenTerminating();
	}
	/**
	 * @param {Function} fn Add a function to sweeper list
	 * @returns {void} 
	 */
	public add(fn: Function): void {
		this.list.push(fn);
	}
	/**
	 * terminate all required process
	 * @returns {void}
	 */
	private sweepWhenTerminating(): void {
		process.on('SIGINT', () => {
			for (const st of this.list) st();
			process.exit(0);
		});
		process.on('uncaughtException', (err) => {
			Logger.error('Uncaught Exception: ' + err);
			for (const st of this.list) st();
			process.exit(0);
		});
	}

}
