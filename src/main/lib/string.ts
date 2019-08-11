import { getNingOfTheDay } from '../3rdparty/moment';
import { randomIndex } from '../utils/array';

/**
 * Handle unknown queries
 * @param name user name
 */
const randomConfusedMessage = (name: string | null): string => {
	const prefixes = [
		'Hmmmm  ',
		'err.. ',
		'Ayay  ',
	];
	const suffixes = [
		'I am not really sure about that..',
		'idk',
		'let me think',
	];
	const n = name ? name : 'friend';
	return `${randomIndex(prefixes)} ${n}, ${randomIndex(suffixes)}`;
};

/**
 * Generate good bye message
 * @param name user name
 */
const randomByeMessage = (name: string | null): string => {
	const suffixes = [
		'Have a good day!',
		'Hope to talk to you again soon mate',
		'Smell ya later ;)',
	];
	const prefixes = ['Good bye', 'Baii', 'Bye bye', 'Aye aye'];
	const n = name ? name : 'friend';
	return `${randomIndex(prefixes)}, ${n}! ${randomIndex(suffixes)}`;
};

/**
 * Generate reply to compliment
 * @param name user name
 */
const randomResponseToComplimentMessage = (name: string | null): string => {
	const suffixes = [
		'I really appreciate it!',
		"I'm touched..",
		'FeelsGoodMan',
	];

	const prefixes = ['Thanks', 'Ty', 'woah', 'Aye aye'];
	const n = name ? name : 'friend';
	return `${randomIndex(prefixes)}, ${n}! ${randomIndex(suffixes)}`;

};

/**
 * Response to thanks
 * @param name user name
 */
const randomResponseToThanksMessage = (name: string | null): string => {

	const prefixes = ['No problemo', 'Np', 'Aye', 'Aye aye'];

	const suffixes = [
		'Glad I could help!',
		'Hope to be of service again~',
		'¯\\_(ツ)_/¯',
	];
	const n = name ? name : 'friend';
	return `${randomIndex(prefixes)}, ${n}! ${randomIndex(suffixes)}`;

};

/**
 * Greeting suffix
 */
const randomGreetingSuffix = () => {
	const suffixes = ["What's up man!~", 'How are you doing!', "Such a nice day isn't it?", "Here's a photo you might like: "];
	return randomIndex(suffixes);
};

/**
 * Greeting prefix
 * @param name user name
 */
const randomGreetingPrefix = async (name: string | null) => {
	const prefixes = [
		'Greetings',
		'Yo',
		'Hello',
		`Good ${await getNingOfTheDay()}`,
	];
	const n = name ? name : 'friend';
	return `${randomIndex(prefixes)}, ${n}!`;
};

const possibleYay: string[] = [
	'Yoshhh!',
	'Ez',
	'Hue hue hue',
	'Ye :>',
	'Nice la',
];

const possibleNay: string[] = [
	'Sorry :<',
	'NANI',
	'Mada Mada',
	'...',
];

export {
	randomConfusedMessage,
	randomByeMessage,
	randomGreetingPrefix,
	randomGreetingSuffix,
	randomResponseToComplimentMessage,
	randomResponseToThanksMessage,
	possibleNay,
	possibleYay,
};
