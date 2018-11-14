import Logger from './logger'
import { tokenizeText } from './utils/string'
import { predict } from './externalApis/@google/tensorflow/intentClassification'
import idx from 'idx'
import { TextDB } from './model/mongoDB'
const CLASSIFY_CONFIDENCE_THRESHOLD = 0.9

/**
* Return the text or document along with the intent of the message
* @param {supportedPlatform} platform
* @param {any} payload
* @param {userType} user
* @return updated user
*/
export default async (platform: supportedPlatform, payload: any, user: userType): Promise<userType> => {
	const log = Logger.info('Analyzing...', true)
	try {
		const {
			text,
			document,
			entity,
			sentiment,
		} = getInformationFromMessage(platform, payload)
		
		
		if (document) {
			user.entity.lastIntent = 'sendDocument'
			user.lastDoc = document
		} else if (text) {
			user.locale = checkLang()
			user.lastText = text
			const intent = await findIntent(text) 
			if (typeof intent === 'string') {
				user.entity = {
					lastIntent: intent,
					sentiment,
				}
			} else {
				user.entity = {
					lastIntent: 'unknown',
					sentiment,
				}
			}
			if (!user.text) user.text = [] 
			const newText = new TextDB({
				orignalText: text,
				tokenizeText: tokenizeText(text),
			})
			user.text.push(newText)
			return user
		}
	} catch (e) {
		return Promise.reject(e)
	} finally {
		log.stop('Analyzed.')
	}
}

interface Info {
	text: any
	document: any
	entity: any
	sentiment: any
}
/**
* Get the information from the message sent by user
* @param {supportedPlatform} platform
* @param {any} payload
* @return Info object
*/
const getInformationFromMessage = (platform: supportedPlatform, payload: any): Info => {
	let info: Info = {
		text: null,
		document: null,
		entity: null,
		sentiment: 'neutral',
	}
	switch (platform) {
		case 'telegram':
		info =  {
			text: payload.text || null,
			document: payload.document || payload.photo || null,
			entity: payload.document || payload.photo ? 'replyToDocument' : null,
			sentiment: 'neutral',
		}
		break
		
		case 'messenger':
		if (idx(payload, (_) => _.message.quick_reply)) {
			const Msgpayload = idx(payload, (_) => _.message.quick_reply.payload)
			if ( Msgpayload === 'CORRECT_SERVICE' || Msgpayload === 'INCORRECT_SERVICE') {
				info.document = {
					type: 'QUICK_REPLY',
					value: Msgpayload,
				}
			}
		} else if (idx(payload, (_) => _.message.text)) {
			info.text = payload.message.text
			info.entity = null
		} else if (idx(payload, (_) => _.message.attachments)) {
			info.entity = 'replyToDocument'
			switch (payload.message.attachments[0].type) {
				case 'image':
				info.document = {
					type: 'image',
				}
				break
				
				case 'video':
				info.document = {
					type: 'video',
				}
				break
				
				case 'audio':
				// message(senderId, await speechToText(payload.message.attachments[0].payload.url))
				info.document = {
					type: 'audio',
				}
				break
				
				case 'location':
				info.document = {
					type: 'location',
					lat: idx(payload, (_) => _.message.attachments[0].payload.coordinates.lat),
					long: idx(payload, (_) => _.message.attachments[0].payload.coordinates.long),
				}
				break
				default:
				
			}
		}
		break
		
		default:
	}
	
	return info
}

/**
* Find the intent in the text message from the convo
* @param {string} text
* @return intent of the text
*/
const findIntent = async (text: string): Promise<string | Error> => {
	try {
		const result = await predict(text)
		let {
			intent,
			confidence,
		} = result
		intent = confidence >= CLASSIFY_CONFIDENCE_THRESHOLD ? intent : null
		return intent
	} catch (e) {
		return Promise.reject(e)
	}
	
}

/**
* //TODO
*/
const checkLang = (): string => 'en'
