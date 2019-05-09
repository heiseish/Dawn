import { randomByeMessage } from '../lib/string';
/**
 * Reply to good bye message
 * @param {userType} user
 * @return updated user
 */
export default async (user: userType): Promise<userType> => {
	user.response = {
		simpleText: randomByeMessage(user.name.first),
		answerable: true,
	};
	return user;
};
