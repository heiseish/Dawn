import idx from  'idx'
import { Observable } from 'rxjs'
import { client } from './@twitter'
import Logger from '../logger'
import firebase from '../model/database/firebasedb'
import { getPlatformAndId } from './../utils/account'

// @messenger
import MesMessage from '../messenger/api/message'
import MesSendImage from '../messenger/api/sendImage'

//@telegram
import { tlgMessage, tlgImage }   from '../telegram/api/'



const POKEMONGO_TWITTER = '2839430431'
const WYK_TWITTER = '44680622'
const MY_TWITTER = '700623960'
const listOfStreams = [
	POKEMONGO_TWITTER,
	WYK_TWITTER,
	MY_TWITTER,
]

type ListOfAudience = string[]
interface OberservableTweet {
	name: string
	text: string
	image: string
	audience: string[]
}

class Streaming {
	public listOfAudience: ListOfAudience | null
	public twitterStreaming: any
	
	constructor(listOfAudience: ListOfAudience = []) {
		this.listOfAudience = listOfAudience || null

		if (listOfAudience) {
			const streaming = Observable.create((observer) => {
				const twitter = client.stream('statuses/filter', {follow: listOfStreams.join(',')})
				twitter.on('data', (tweet) => {
					if (listOfStreams.includes(tweet.user.id_str)) {
						observer.next({
							name: tweet.user.name,
							text: tweet.text,
							image: idx(tweet, (_) => _.extended_entities.media[0].media_url_https) || null,
							audience: listOfAudience,
						})
					}
				})
				twitter.on('error', (error) => {
					observer.error(error)
				})

				return () => {
					Logger.warn('Closing twitter stream')
				}
			})

			this.twitterStreaming = streaming.subscribe({
				next: (x: OberservableTweet) => {
					for (const userId of x.audience) {
						let message: Function
						let image: Function
						const {
							platform,
							id,
						} = getPlatformAndId(userId)
						if (platform === 'messenger') {
							message = MesMessage
							image = MesSendImage
							// } else if (platform === 'telegram') {
						} else {
							message = tlgMessage
							image = tlgImage
						}
						message(id, `${x.name}: ${x.text}`)
						if (x.image) { image(id, x.image) }
					}
				},
				error: (err) => Logger.error('something wrong occurred: ' + err),
				complete: () => Logger.info('done'),
			})
		}
	}

	public stopStreaming(): void {
		Logger.warn('Resetting Twitter streaming because of a new stream')
		this.twitterStreaming.unsubscribe()

	}

	public isStreaming(): boolean {
		return this.listOfAudience != null
	}
}

const setUpStreamingApi = (): void => {
	let StreamingInstance = new Streaming()
	firebase.database().ref('restricted_access/streaming/').on('value', (snap) => {
		const result = snap.val()
		let audience: ListOfAudience
		if (Array.isArray(result)) { 
			audience = result 
		} else if (typeof result === 'object') { 
			audience = Object.values(result) 
		}
		if (StreamingInstance.isStreaming()) StreamingInstance.stopStreaming()
		StreamingInstance = new Streaming(audience)
	}, (err) => {
		Logger.error(err)
	})
}
export default setUpStreamingApi
