import _ from 'lodash/core';
import mojiTranslate from 'moji-translate';
import rp from 'request-promise';
import {
	externalAPIRequest
} from '../utils/request';
const WORLD_CUP_URI = 'http://worldcup.sfg.io/matches';
import { padLeft, padRight } from '../utils/string';
const MAX_COUNTRY_LENGTH = 10;
const MAX_GOALS_LENGTH = 2;


/**
 * Pad right of the text
 * @param value value to pad right
 * @param char character to be padded
 * @param length length of the padding
 * @returns padded string
 */
const rpad = ( value: string, char: string, length: number ): string => {
	return ( value + char.repeat( length ) ).substring(0, length);
};

interface Match {
	status: 'completed' | 'in progress'| 'ongoing',
	datetime: string,
	home_team: {
		country: string,
		goals: string 
	},
	away_team: {
		country: string,
		goals: string 
	}
}
/**
 * Check if a match is completed or in progress
 * @param match match that need to check
 * @returns true if the match is completed or in progress, false otherwise
 */
const isCompletedOrInProgress = (match: Match): boolean => {
	return match.status === 'completed' || match.status === 'in progress';
};


/**
 * Check if a match is happening today
 * @param match match that needs to be checked
 * @returns true if the match is happening today, false otherwise
 */
const matchHappeningToday = (match: Match): boolean => {
	const date = new Date(match.datetime);
	const today = new Date();
	return ((date.getDate() === today.getDate()
	&& date.getMonth() === today.getMonth())
	|| (date.getMonth() === today.getMonth()
	&& date.getDate() === today.getDate() + 1
	&& date.getHours() === 2))
	&& (date.getDate() + date.getHours().toString() !== today.getDate() + '2');
};


/**
 * Get country flag with moji module
 * @param value country name
 * @return country flag code
 */
const getCountryFlag = ( value: string ): string => {
	return mojiTranslate.translate( value.replace(/ /g, '_'), true );
};


/**
 * Get nicely formatted message about the happening match
 * @param match Match
 * @returns nicely formatted string
 */
const toConsoleOutput = (match: Match): string => {
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

/**
 * Get the matches
 * @return {Promise<Match[]>} World cup matches
 */
const getMatches = async (): Promise<Match[]> => {
	try {
		const matches = await externalAPIRequest({ uri: WORLD_CUP_URI});
		return matches;
	} catch (e) {
		return Promise.reject(e);
	}
};

/**
* Get the last n matches of specific synchronous filter
* @param {Match[]} matches
* @param {Function} filter
* @param {number} n
*/
const synchFilter = (matches: Match[], filter: (match: Match) => boolean, n?: number): Promise<Match[]> => {
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

/**
 * Get nicely formatted message on currently ongoing WC games
 * @returns formatted string
 */
const getWCSchedule = async (): Promise<string> => {
	try {
		const NO_MATCH_TODAY = "There isn't any match today!";
		const matches = await getMatches();
		const past = await synchFilter(matches, isCompletedOrInProgress, 3);
		const present = await synchFilter(matches, matchHappeningToday, 10);

		let message = 'Last 3 matches: \n';
		if (!_.isEmpty(past)) {
			for (const match of past) { 
				message += match + '\n'; 
			}
		}
		message += 'Today matches: \n';
		if (!_.isEmpty(present)) {
			for (const match of present) { 
				message += match + '\n'; 
			}
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
