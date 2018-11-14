import marked from 'marked'
import { editGist, createGist} from './gists'
import os from 'os'

marked.setOptions({
	renderer: new marked.Renderer(),
	gfm: true,
	tables: true,
	breaks: true,
	pedantic: false,
	sanitize: false,
	smartLists: true,
	smartypants: false,
	xhtml: false,
})
const GIST_ID = '522028088e49110b4511d4cabea361f9'
const MANUAL_DESC = 'An automatically generated and updated help manual of Serena bot'
const ICON = '![Imgur](https://i.imgur.com/JQheM1b.png)'

/**
 * Generate help manual
 * @param actions array of executable object
 */
const generateHelpManual = async (actions: any[]):Promise<string> => {
	try {
		const fileString:string = await generateFileString(actions)
		const opts = {
			description: MANUAL_DESC,
			public: true,
			files: {
				'manual.md': {
					content: fileString,
				},
			},
		}
		const result = await createGist(opts)
		return result
	} catch (e) {
		return Promise.reject(e)
	}
}

/**
 *  A function to update the list manual with the manual containing all the functions available
 * @param actions 
 */
const updateHelpManual = async (actions: any[]): Promise<string> => {
	try {
		const fileString = await generateFileString(actions)
		const opts = {
			id: GIST_ID,
			files: {
				'manual.md': {
					content: fileString,
				},
			},
		}
		const result = await editGist(opts)
		return result
	} catch (e) {
		return Promise.reject(e)
	}
}

/**
 * A function to generate a file string with all actions listed
 * @param actions 
 */
const generateFileString = (actions: any[]):string => {
	const linebr = os.EOL + os.EOL
	let fileString = `# Help manual for Serena bot ${linebr}`
	fileString += MANUAL_DESC + linebr
	fileString += '### Notation:' + ICON + linebr
	fileString += 'Intent: The service that Serena could execute/respond to.'
	+ 'Ask questions along with line of the intent and the bot should be able to answer' + linebr
	fileString += 'Description: more details about the service.' + linebr
	fileString += '***' + linebr

	for (const action of actions) {
		fileString += '- __Intent:__ `' + action.name + '` ' + linebr
		fileString += `> __Description:__ ${action.description} ${linebr}`
	}
	return fileString
}

export {
	generateHelpManual,
	updateHelpManual,
}
