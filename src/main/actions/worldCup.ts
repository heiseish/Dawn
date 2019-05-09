import getWCSchedule from '../externalApis/worldCup';
/**
 * Return today world cup schedule
 * @param {userType} user
 * @return Promise containing updated response
 */
export default async (user: userType): Promise<userType | Error> => {
	try {
		let message:string = await getWCSchedule();
		user.response = {
			answerable: true,
			simpleText: message,
		};
		return user;
	} catch (e) {
		return Promise.reject(e);
	}

};
