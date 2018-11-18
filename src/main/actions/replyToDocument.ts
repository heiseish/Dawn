import geocoder from 'geocoder'
import idx from 'idx'
import getRandomGif from '../externalApis/giphy'
import { possibleNay, possibleYay } from '../lib/string'
import { randomIndex } from '../utils/array'

/**
 * Handle document from messenger
 * @param {userType} user
 * @return updated user
 */
export default (user: userType): Promise<userType> => {
	return new Promise((resolve, reject) => {
		switch (user.lastDoc.type) {
		case 'image':
			getRandomGif()
				.then((res) => {
					user.response = {
						answerable: true,
						image:  res,
					}
				})
				.catch((err) => reject(err))
			break

		case 'video':
			user.response = {
				answerable: true,
				simpleText: 'Nice video!',
			}
			break

		case 'location':
			geocoder.reverseGeocode(user.lastLocation.lat, user.lastLocation.long, (err, data) => {
				if (err) { reject(err) }
				const lastLocation = typeof user.toObject === 'function' ? user.toObject().lastLocation : user.lastLocation
				user.lastLocation = {
					...lastLocation,
					formattedAddress: idx(data, (_) => _.results[0].formatted_address),
				}
				user.response = {
					simpleText: 'I see that you are @ ' + idx(data, (_) => _.results[0].formatted_address) + ' right now!',
					answerable: true,
				}
			})
			break

		case 'QUICK_REPLY':
			if (user.lastDoc.value === 'INCORRECT_SERVICE') {
				user.text[user.text.length - 1].correctlyAnswered = false
				user.response = {
					simpleText: randomIndex(possibleNay),
					answerable: true,
				}
			} else {
				user.response = {
					simpleText: randomIndex(possibleYay),
					answerable: true,
				}
			}
			break

		case 'audio':
			user.response = {
				answerable: true,
				simpleText: 'Nice voice!',

			}
			break

		default:
			resolve(user)
		}
		resolve(user)
	})
}
