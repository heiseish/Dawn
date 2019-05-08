import { getWeatherMessage } from '../externalApis/weather';

/**
 * Inform user of the current weather
 * @param {userType} user
 * @return PRomise containing updated user
 */
export default (user: userType): Promise<userType |  Error> => {
	return new Promise((resolve, reject) => {
		getWeatherMessage().then(({current, summary, imageId}) => {
			user.response = {
				simpleText: current + summary,
				image: imageId,
				answerable: true,

			};
			resolve(user);
		}).catch((err) => {
			reject(err);
		});
	});
};
