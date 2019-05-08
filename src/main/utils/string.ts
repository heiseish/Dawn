import natural from 'natural';
natural.PorterStemmer.attach();
/**
* Tokenized text and return an array of stem words
* NOTE: Quite unreliable
* @param {string} text
* @return array of tokenized text
*/
const tokenizeText = (text: natural.String): string[] => text.toLowerCase().tokenizeAndStem();

/**
* Right padding s with c to a total of n chars
* @param {string} s original string
* @param {string} c character to be padded
* @param {number} n length
* @return string with right side padded
*/
const padRight = (s: string, c: string, n: number): string => {
	if (! s || ! c || s.length >= n) {
		return s;
	}
	const max = (n - s.length) / c.length;
	for (let i = 0; i < max; i++) {
		s += c;
	}
	return s;
};

/**
* Left padding s with c to a total of n chars
* @param {string} s original string
* @param {string} c character to be padded
* @param {number} n length
* @return a string with left side padded
*/
const padLeft = (s: string, c: string, n: number): string => {
	if (! s || ! c || s.length >= n) {
		return s;
	}
	const max = (n - s.length) / c.length;
	for (let i = 0; i < max; i++) {
		s = c + s;
	}
	return s;
};

/**
* Remove all substrings inside a string
* @param {string} s original string
* @param {string} substrings substrings to be removed
* @return a string with all substrings removed
*/
const replaceAllSubstring = (s: string, ...substrings: string[]): string => {
	for (const substring of substrings) { s = replaceAll(s, substring, ''); }
	return s;
};

/**
* Return a numeric substring from a string
* @param {string} s original strong
* @param {number} index index of the numeric subtring to be returned. default is 0
* @return a string that is convertible to a number
*/
const getNumberStringFromString = (s: string, index?: number): string | null => {
	const i = index ? index : 0;
	return s.match(/\d+/)[i] ? s.match(/\d+/)[i] : s.match(/\d+/)[0] ? s.match(/\d+/)[0] : null;
};

/**
* Generate a random string of numbers based on length given
* @param {number} length
* @return a random string consists of n umber
*/
const generateRandomId = (length = 10): string => {
	let text = '';
	const possible = '0123456789';
	for (let i = 0; i < length; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
	return text;
};

/**
* Replace all occurence of a substring in a string
* @param {string} str
* @param {string} find
* @param {string} replace
* @return a string will all `find` replaced by `replace`
*/
const replaceAll = (str, find, replace): string => {
	return str.replace(new RegExp(find, 'g'), replace);
};

export {
	padRight,
	padLeft,
	replaceAllSubstring,
	getNumberStringFromString,
	generateRandomId,
	tokenizeText,
	replaceAll,
};
