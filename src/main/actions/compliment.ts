import { randomResponseToComplimentMessage } from '../lib/string';
/**
 * Reply to people's compliment
 * @param {userType} user
 * @return updated user
 */
export default async (user: userType): Promise<userType> => {
	user.response = {
		simpleText: randomResponseToComplimentMessage(user.name.first),
		answerable: true,
	};
	return user;
};
