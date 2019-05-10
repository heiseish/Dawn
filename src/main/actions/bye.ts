import { randomByeMessage } from '../lib/string';
/**
 * Reply to good bye message
 * @param {Dawn.userType} user
 * @return updated user
 */
export default async (user: Dawn.userType): Promise<Dawn.userType> => {
	user.response = {
		simpleText: randomByeMessage(user.name.first),
		answerable: true,
	};
	return user;
};
