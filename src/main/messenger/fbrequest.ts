import request from 'request'
import { FB_PAGE_TOKEN } from '../environment'
const messaging: any = request.defaults({
	uri: 'https://graph.facebook.com/v2.6/me/messages',
	method: 'POST',
	json: true,
	qs: { access_token: FB_PAGE_TOKEN },
	headers: { 'Content-Type': 'application/json' },
})

const uploading: any = request.defaults({
	uri: 'https://graph.facebook.com/v2.6/me/message_attachments',
	method: 'POST',
	json: true,
	qs: { access_token: FB_PAGE_TOKEN },
	headers: { 'Content-Type': 'application/json' },
})

export {
	messaging,
	uploading,
}
