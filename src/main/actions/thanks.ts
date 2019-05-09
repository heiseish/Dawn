import { randomResponseToThanksMessage } from '../lib/string';
/**
 * Reply to people thanking
 * @param {userType} user
 * @return parsed User
 */
export default async (user: userType): Promise<userType> => {
	user.response = await {
		simpleText: randomResponseToThanksMessage(user.name.first),
		answerable: true,
	};
	return user;
};
