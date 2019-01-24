import chalk from 'chalk'
import ora from 'ora'

class Logger {
	private prefixColor
	constructor() {
		this.prefixColor = chalk.magenta
	}
	/**
	* log the info
	* @param text Text to display
	* @param load whether the text animation is loading
	* @returns object with method stop that takes in after-text as a string
	*/
	public info(text: string, load?: boolean): void | any {
		if (load) {
			const spinner = ora({
				text: this.generateDateTimePrefix()
				+ chalk.green('info: ') + chalk.cyan(text),
				spinner: 'arc',

			})
			spinner.start()
			/**
			* Stop the loading animation and display afterText
			* @param afterText text to displat after loading animation
			*/
			const stop = (afterText?: string) => {
				spinner.stopAndPersist({
					text: this.generateDateTimePrefix()
					+ chalk.green('info: ') + chalk.cyan(afterText),
					spinner: 'arc' || 'done',
					symbol: '✓',
				})
			}
			return { stop }
		} else { this.log(text, 'info') }
	}

	/**
	 * Logging the warning text
	 * @param text warning text
	 */
	public warn(text: string) {
		this.log(text, 'warn')
	}

	/**
	 * Logging the error text
	 * @param text error text
	 */
	public error(text: string) {
		this.log(text, 'error')
	}
	/**
	* Logging separator symbols
	* @param text separator symbols
	*/
	public separator(text: string = '=====================================') {
		console.log(chalk.yellow(text))
	}

	/**
	 * Generate date and time prefix for logging
	 */
	private generateDateTimePrefix() {
		if (process.env.NODE_ENV === 'production') return ''
		else return '[' + this.prefixColor(new Date().toString()) + ']'
	}
	/**
	 * Logging out the text with prefix color
	 * @param text text to log
	 * @param color color of primary text
	 */
	private log(text: string, level?: 'info' | 'error' | 'warn') {
		let color
		switch (level) {
			case 'info':
			color = chalk.green
			break

			case 'error':
			color = chalk.red
			break

			case 'warn':
			color = chalk.yellow
			break

			default:
			color = chalk.white
		}
		console.log(this.generateDateTimePrefix()
		+ color(`${level}: `) + chalk.cyan(text))
	}
}

export default new Logger()
