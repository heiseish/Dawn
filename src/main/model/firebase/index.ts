import encryptedServiceAccount from './account.json'
import * as admin from 'firebase-admin'
import { decrypt } from '../../lib/encrypt'
import Logger from '../../logger'

export default class Firebase {
	private db
	constructor() {
		Logger.info('Establishing connection to firebase...')
		this.db = admin
		this.db.initializeApp({
			credential: admin.credential.cert(decrypt(encryptedServiceAccount)),
			databaseURL: 'https://mvpapp-1ba71.firebaseio.com',
		})
	}
	
	/**
	 * Terminate connection to firebase database
	 */
	public terminateConnection = ():void => {
		Logger.warn('Closing connection to firebase db...')
		this.db.app().delete()
	}

	/**
	 * Get a list of streaming audience
	 * @returns {Promise<string[]>} list of streaming audience
	 */
	public async getStreamingAudience():Promise<string[]> {
		const snap = await this.db.database().ref('restricted_access/streaming/').once('value')
		const result = snap.val()
		let audience = [] as string[]
		if (Array.isArray(result)) audience = result
		else if (typeof result === 'object') audience = Object.values(result)
		return audience
	}

	/**
	 * Get codeforce handle
	 * @returns {Promise<string>} handle
	 */
	public async getCodeforceHandle():Promise<string> {
		const snap = await this.db.database().ref('restricted_access/codeforce/handle').once('value')
		return snap.val()
	}

	/**
	 * Get current codeforce standing
	 * @returns {Promise<CFRanking>} cf ranking
	 */
	public async getCurrentCodeforceStanding():Promise<CFRanking> {
		const snap = await this.db.database().ref('restricted_access/codeforce/standing/').once('value')
		return snap.val()
	}

	/**
	 * Get current codeforce standing
	 * @param {CFRanking} cf ranking
	 */
	public async setCurrentCodeforceStanding(ranking: CFRanking):Promise<void> {
		await this.db.database().ref('restricted_access/codeforce/standing/').set(ranking)
	}
}

