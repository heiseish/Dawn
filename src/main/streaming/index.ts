import firebase from '../model/database/firebasedb'
import { getPlatformAndId } from './../utils/account'
import Logger from '../logger'
import MesMessage from '../messenger/api/message'
import MesSendImage from '../messenger/api/sendImage'
import { tlgImage, tlgMessage }   from '../telegram/api/'


interface StreamableObject {
	text?: string,
	image?: string
}
/**
 * 
 * @param toStream object to stream
 */
const stream = (toStream: StreamableObject):void => {
	firebase.database().ref('restricted_access/streaming/').once('value').then(snap => {
		const result = snap.val()
		let audience
		if (Array.isArray(result)) audience = result
		else if (typeof result === 'object') audience = Object.values(result)
		for (let userId of audience) {
			const {
				platform,
				id,
			} = getPlatformAndId(userId)
			let message, image
			if (platform === 'messenger') {
				message = MesMessage
				image = MesSendImage
			} else {
				message = tlgMessage
				image = tlgImage
			}
			if (toStream.text) message(id, toStream.text)
			if (toStream.image) image(id, toStream.image) 
		}
	}, (err) => {
		Logger.error(err)
	})
}

export default stream