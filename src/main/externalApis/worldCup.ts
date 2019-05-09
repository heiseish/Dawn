import _ from 'lodash/core';
import mojiTranslate from 'moji-translate';
import rp from 'request-promise';
import { padLeft, padRight } from '../utils/string';
import {
	WAIT_TIME_FOR_EXTERNAL_API
} from '../environment';
const MAX_COUNTRY_LENGTH = 10;
const MAX_GOALS_LENGTH = 2;

const options:rp.OptionsWithUri = {
	uri: 'http://worldcup.sfg.io/matches',
	headers: {
		'User-Agent': 'Request-Promise',
	},
	json: true, // Automatically parses the JSON string in the response,
	timeout: WAIT_TIME_FOR_EXTERNAL_API
};

const rpad = ( value, char, length ): string | void => {
	if ( typeof value === 'undefined' ) {
		return undefined;
	}
	return ( value + char.repeat( length ) ).substring(0, length);
};

const isCompletedOrInProgress = (match): boolean => {
	return match.status === 'completed' || match.status === 'in progress';
};

const matchHappeningToday = (match: any) => {
	const date = new Date(match.datetime);
	const today = new Date();
	return ((date.getDate() === today.getDate()
	&& date.getMonth() === today.getMonth())
	|| (date.getMonth() === today.getMonth()
	&& date.getDate() === today.getDate() + 1
	&& date.getHours() === 2))
	&& (date.getDate() + date.getHours().toString() !== today.getDate() + '2');
};

const getCountryFlag = ( value ): string => {
	return mojiTranslate.translate( value.replace(/ /g, '_'), true );
};

const toConsoleOutput = (match): string => {
	let homeFlag = getCountryFlag( match.home_team.country );
	if ( ! homeFlag ) {
		homeFlag = '  ';
	}
	const home = padRight( match.home_team.country, ' ', MAX_COUNTRY_LENGTH );
	const homeGoals = rpad( match.home_team.goals, ' ', MAX_GOALS_LENGTH ) || '';

	const awayFlag = getCountryFlag( match.away_team.country );
	const away = padLeft( match.away_team.country, ' ', MAX_COUNTRY_LENGTH );
	const awayGoals = rpad( match.away_team.goals, ' ', MAX_GOALS_LENGTH ) || '';

	const hours = new Date(match.datetime).getHours();
	const presentableHours = hours < 12 ?
	hours.toString() + 'am'
	: (hours - 12).toString() + 'pm';
	return `${homeFlag} ${home} ${homeGoals} -  ${awayGoals} ${away} ${awayFlag} ${presentableHours}`;
};

const getMatches = async (): Promise<any> => {
	try {
		const matches = await rp(options);
		return matches;
	} catch (e) {
		return Promise.reject(e);
	}
};

/**
* Get the last n matches of specific synchronous filter
* @param {any} matches
* @param {any} filter
* @param {number} n
*/
const synchFilter = (matches: any, filter: (match: any) => boolean, n?: number): Promise<any> => {
	return new Promise((resolve) => {
		n = n ? n : 3;
		const temp = matches;
		const result = [];
		temp
		.filter( filter )
		.map( toConsoleOutput )
		.forEach( (r) => result.push(r));
		resolve(result.slice(Math.max(result.length - n, 1)));
	});
};

const getWCSchedule = async (): Promise<string> => {
	try {
		const NO_MATCH_TODAY = "There isn't any match today!";
		const matches = await getMatches();
		const past = await synchFilter(matches, isCompletedOrInProgress, 3);
		const present = await synchFilter(matches, matchHappeningToday, 10);

		let message = 'Last 3 matches: \n';
		if (!_.isEmpty(past)) {
			for (const match of past) { message += match + '\n'; }
		}
		message += 'Today matches: \n';
		if (!_.isEmpty(present)) {
			for (const match of present) { message += match + '\n'; }
		}

		if (!_.isEmpty(past) || !_.isEmpty(present)) {
			return message;
		} else {
			return NO_MATCH_TODAY;
		}

	} catch (e) {
		return Promise.reject(e);
	}

};

export default getWCSchedule;
