"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const ora_1 = __importDefault(require("ora"));
class Logger {
    constructor() {
        this.prefixColor = chalk_1.default.magenta;
    }
    /**
    * log the info
    * @param text Text to display
    * @param load whether the text animation is loading
    */
    info(text, load) {
        if (load) {
            const spinner = ora_1.default({
                text: this.generateDateTimePrefix()
                    + chalk_1.default.green('info: ') + chalk_1.default.cyan(text),
                spinner: 'arc',
            });
            spinner.start();
            /**
            * Stop the loading animation and display afterText
            * @param afterText text to displat after loading animation
            */
            const stop = (afterText) => {
                spinner.stopAndPersist({
                    text: this.generateDateTimePrefix()
                        + chalk_1.default.green('info: ') + chalk_1.default.cyan(afterText),
                    spinner: 'arc' || 'done',
                    symbol: '✓',
                });
            };
            return { stop };
        }
        else {
            this.log(text, 'info');
        }
    }
    /**
     * Logging the warning text
     * @param text warning text
     */
    warn(text) {
        this.log(text, 'warn');
    }
    /**
     * Logging the error text
     * @param text error text
     */
    error(text) {
        this.log(text, 'error');
    }
    /**
    * Logging separator symbols
    * @param text separator symbols
    */
    separator(text) {
        console.log(chalk_1.default.yellow(text));
    }
    /**
     * Generate date and time prefix for logging
     */
    generateDateTimePrefix() {
        if (process.env.NODE_ENV === 'production')
            return '';
        else
            return '[' + this.prefixColor(new Date().toString()) + ']';
    }
    /**
     * Logging out the text with prefix color
     * @param text text to log
     * @param color color of primary text
     */
    log(text, level) {
        let color;
        switch (level) {
            case 'info':
                color = chalk_1.default.green;
                break;
            case 'error':
                color = chalk_1.default.red;
                break;
            case 'warn':
                color = chalk_1.default.yellow;
                break;
            default:
                color = chalk_1.default.white;
        }
        console.log(this.generateDateTimePrefix()
            + color(`${level}: `) + chalk_1.default.cyan(text));
    }
}
exports.default = new Logger();
//# sourceMappingURL=index.js.map