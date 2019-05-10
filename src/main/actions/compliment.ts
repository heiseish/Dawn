import { randomResponseToComplimentMessage } from '../lib/string';
/**
 * Reply to people's compliment
 * @param {Dawn.userType} user
 * @return updated user
 */
export default async (user: Dawn.userType): Promise<Dawn.userType> => {
	user.response = {
		simpleText: randomResponseToComplimentMessage(user.name.first),
		answerable: true,
	};
	return user;
};
