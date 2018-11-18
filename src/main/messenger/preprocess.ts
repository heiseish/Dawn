import { FB_PAGE_ID, FB_PAGE_TOKEN } from '../environment'
import { markSeen, typingOff, typingOn } from './api/senderAction'

if (!FB_PAGE_ID) throw new Error('missing FB_PAGE_ID') 
if (!FB_PAGE_TOKEN) throw new Error('missing FB_PAGE_TOKEN')

export default (messagingEvents: any, cb?: (event: any) => void) => {
	for (let i = 0; i < messagingEvents.length; i++) {
		const event = messagingEvents[i]
		const senderId = event.sender.id
		markSeen(senderId)
		typingOn(senderId)
		if (cb) cb(event)
		typingOff(senderId)	}

}
