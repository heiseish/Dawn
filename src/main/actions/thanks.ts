import { randomResponseToThanksMessage } from '../lib/string'
/**
 * Reply to people thanking
 * @param {userType} user
 * @return parsed User
 */
export default (user: userType): userType => {
	user.response = {
		simpleText: randomResponseToThanksMessage(user.name.first),
		answerable: true,
	}
	return user
}
