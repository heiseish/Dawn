"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const marked_1 = __importDefault(require("marked"));
const gists_1 = require("./gists");
const os_1 = __importDefault(require("os"));
marked_1.default.setOptions({
    renderer: new marked_1.default.Renderer(),
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false,
});
const GIST_ID = '522028088e49110b4511d4cabea361f9';
const MANUAL_DESC = 'An automatically generated and updated help manual of Serena bot';
const ICON = '![Imgur](https://i.imgur.com/JQheM1b.png)';
/**
 * Generate help manual
 * @param actions array of executable object
 */
const generateHelpManual = (actions) => __awaiter(this, void 0, void 0, function* () {
    try {
        const fileString = yield generateFileString(actions);
        const opts = {
            description: MANUAL_DESC,
            public: true,
            files: {
                'manual.md': {
                    content: fileString,
                },
            },
        };
        const result = yield gists_1.createGist(opts);
        return result;
    }
    catch (e) {
        return Promise.reject(e);
    }
});
exports.generateHelpManual = generateHelpManual;
/**
 *  A function to update the list manual with the manual containing all the functions available
 * @param actions
 */
const updateHelpManual = (actions) => __awaiter(this, void 0, void 0, function* () {
    try {
        const fileString = yield generateFileString(actions);
        const opts = {
            id: GIST_ID,
            files: {
                'manual.md': {
                    content: fileString,
                },
            },
        };
        const result = yield gists_1.editGist(opts);
        return result;
    }
    catch (e) {
        return Promise.reject(e);
    }
});
exports.updateHelpManual = updateHelpManual;
/**
 * A function to generate a file string with all actions listed
 * @param actions
 */
const generateFileString = (actions) => {
    const linebr = os_1.default.EOL + os_1.default.EOL;
    let fileString = `# Help manual for Serena bot ${linebr}`;
    fileString += MANUAL_DESC + linebr;
    fileString += '### Notation:' + ICON + linebr;
    fileString += 'Intent: The service that Serena could execute/respond to.'
        + 'Ask questions along with line of the intent and the bot should be able to answer' + linebr;
    fileString += 'Description: more details about the service.' + linebr;
    fileString += '***' + linebr;
    for (const action of actions) {
        fileString += '- __Intent:__ `' + action.name + '` ' + linebr;
        fileString += `> __Description:__ ${action.description} ${linebr}`;
    }
    return fileString;
};
//# sourceMappingURL=marked.js.map