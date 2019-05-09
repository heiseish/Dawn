const MANUAL_LINK = 'https://gist.github.com/MadaraUCH/522028088e49110b4511d4cabea361f9';
/**
 * Retrieve the help manual for user
 * @param {userType} user
 * @return updated user
 */
export default async (user: userType): Promise<userType> => {
	user.response = await {
		simpleText: 'You may find the help manual here: ' + MANUAL_LINK,
		answerable: true,
	};
	return user;
};
