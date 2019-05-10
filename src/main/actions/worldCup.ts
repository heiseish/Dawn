import getWCSchedule from '../externalApis/worldCup';
/**
 * Return today world cup schedule
 * @param {Dawn.userType} user
 * @return Promise containing updated response
 */
export default async (user: Dawn.userType): Promise<Dawn.userType | Error> => {
	try {
		const message: string = await getWCSchedule();
		user.response = {
			answerable: true,
			simpleText: message,
		};
		return user;
	} catch (e) {
		return Promise.reject(e);
	}

};
