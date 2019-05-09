import chalk from 'chalk';
import ora from 'ora';

class Logger {
	private prefixColor;
	constructor() {
		this.prefixColor = chalk.magenta;
	}
	/**
	* Display the info under [info] tag
	* @param text Text to display
	* @param load whether the text animation is loading
	* @returns object with method stop that takes in after-text as a string
	*/
	info(text: string, load?: boolean, component: string | null = null): void | any {
		if (load) {
			const spinner: ora.Ora = ora({
				text: this.generateDateTimePrefix()
				+ chalk.green('info: ') + chalk.cyan(text),
				spinner: 'arc',

			});
			spinner.start();
			/**
			* Stop the loading animation and display afterText
			* @param afterText text to displat after loading animation
			*/
			const stop = (afterText?: string): void => {
				spinner.stopAndPersist({
					text: this.generateDateTimePrefix()
					+ chalk.green('info: ') + chalk.cyan(afterText),
					symbol: '✓',
				});
			};
			return { stop };
		} else this.log(text, 'info', component);

	}

	/**
	 * Logging the warning text
	 * @param text warning text
	 * @param component component to display the message
	 */
	warn(text: string, component: string | null = null) {
		this.log(text, 'warn', component);
	}

	/**
	 * Logging the error text
	 * @param text error text
	 */
	error(text: string, component: string | null = null) {
		this.log(text, 'error', component);
	}
	/**
	* Logging separator symbols
	* @param text separator symbols
	*/
	separator(text = '=====================================') {
		console.log(chalk.yellow(text));
	}
	/**
	 * Generate date and time prefix for logging
	 */
	private generateDateTimePrefix() {
		if (process.env.NODE_ENV != 'production') {
			return '[' + this.prefixColor(new Date().toString()) + ']';
		}
		return '';
	}
	/**
	 * Logging out the text with prefix color
	 * @param text text to log
	 * @param color color of primary text
	 */
	private log(text: string, level: 'info' | 'error' | 'warn', component: string | null) {
		let color;
		switch (level) {
			case 'info':
			color = chalk.green;
			break;

			case 'error':
			color = chalk.red;
			break;

			case 'warn':
			color = chalk.yellow;
			break;

			default:
			color = chalk.white;
		}
		console.log(this.generateDateTimePrefix()
		+ color(`[${level}]: `) + (component ? `[${component}]` : ``)+ chalk.cyan(text));
	}
}

export default new Logger();
