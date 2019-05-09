import { getWeatherMessage } from '../externalApis/weather';

/**
 * Inform user of the current weather
 * @param {userType} user
 * @return PRomise containing updated user
 */
export default async (user: userType): Promise<userType> => {
	try {
		let {
			current,
			summary, 
			imageId
		} = await getWeatherMessage();
		user.response = {
			simpleText: current + summary,
			image: imageId,
			answerable: true,
		};
		return user;
	} catch(e) {
		return Promise.reject(e);
	}
};
