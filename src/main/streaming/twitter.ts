import idx from  'idx'
import { Observable } from 'rxjs'
import Logger from '../logger'
import { client } from '../externalApis/@twitter'
import stream from './'

const POKEMONGO_TWITTER = '2839430431'
const WYK_TWITTER = '44680622'
const MY_TWITTER = '700623960'
const KUROKY_TWITTER = '949785073'
const MATUM_TWITTER = '2773714579'
const GH_TWITTER = '1574718510'
const MIRACLE_TWITTER = '3907466052'
const MC_TWITTER = '2870796886'
const NORDAX_TWITTER = '795002060643205124'
const listOfStreams = [
	POKEMONGO_TWITTER,
	WYK_TWITTER,
	MY_TWITTER,
	KUROKY_TWITTER,
	MATUM_TWITTER,
	GH_TWITTER,
	MIRACLE_TWITTER,
	MC_TWITTER,
	NORDAX_TWITTER
]

interface OberservableTweet {
	name: string
	text: string
	image: string
	audience: string[]
}

/**
 * Class for twitter streaming
 */
export default class TwitterStreaming {
	public streaming
	public twitterStreaming
	
	/**
	 * Constructor for twitter streaming class
	 */
	constructor() {
		this.streaming = Observable.create((observer) => {
			const twitter = client.stream('statuses/filter', {follow: listOfStreams.join(',')})
			twitter.on('data', (tweet) => {
				if (listOfStreams.includes(tweet.user.id_str)) {
					observer.next({
						name: tweet.user.name,
						text: tweet.text,
						image: idx(tweet, (_) => _.extended_entities.media[0].media_url_https) || null
					})
				}
			})
			twitter.on('error', (error) => {
				observer.error(error)
			})
			
			return () => {
				twitter.destroy()
			}
		})
	}
	
	/**
	 * Start listenning to twitter streaming api
	 * @param {string[]} people list of people to send message to
	 */
	public startStreaming(people: string[]):void {
		Logger.info('Starting twitter stream')
		this.twitterStreaming = this.streaming.subscribe({
			next: (x: OberservableTweet) => {
				stream({
					text: x.name + ': ' + x.text,
					image: x.image
				}, people)
			},
			error: (err) => Logger.error('something wrong occurred: ' + err),
			complete: () => Logger.info('done'),
		})
	}
	
	/**
	 * Terminate the stream
	 */
	public stopStreaming = (): void => {
		Logger.warn('Stopping Twitter stream')
		this.twitterStreaming.unsubscribe()	
	}
}
