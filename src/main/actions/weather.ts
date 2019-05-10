import { getWeatherMessage } from '../externalApis/weather';

/**
 * Inform user of the current weather
 * @param {Dawn.userType} user
 * @return PRomise containing updated user
 */
export default async (user: Dawn.userType): Promise<Dawn.userType> => {
	try {
		const {
			current,
			summary,
			imageId,
		} = await getWeatherMessage();
		user.response = {
			simpleText: current + summary,
			answerable: true,
		};
		if (user.platform == 'messenger')
			user.response.image = imageId;
		return user;
	} catch (e) {
		return Promise.reject(e);
	}
};
