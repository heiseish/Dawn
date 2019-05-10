import { randomResponseToThanksMessage } from '../lib/string';
/**
 * Reply to people thanking
 * @param {Dawn.userType} user
 * @return parsed User
 */
export default async (user: Dawn.userType): Promise<Dawn.userType> => {
	user.response = await {
		simpleText: randomResponseToThanksMessage(user.name.first),
		answerable: true,
	};
	return user;
};
