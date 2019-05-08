import { temporalPadding } from '@tensorflow/tfjs-layers/dist/layers/padding';
import * as admin from 'firebase-admin';
import { decrypt } from '../../lib/encrypt';
import Logger from '../../logger';
import encryptedServiceAccount from './account.json';

export default class Firebase {
	private db;
	constructor() {
		Logger.info('Establishing connection to firebase...');
		this.db = admin;
		this.db.initializeApp({
			credential: admin.credential.cert(decrypt(encryptedServiceAccount)),
			databaseURL: 'https://mvpapp-1ba71.firebaseio.com',
		});
	}

	/**
	 * Terminate connection to firebase database
	 */
	terminateConnection = (): void => {
		Logger.warn('Closing connection to firebase db...');
		this.db.app().delete();
	}

	/**
	 * Get a list of streaming audience
	 * @returns {Promise<string[]>} list of streaming audience
	 */
	async getStreamingAudience(): Promise<string[]> {
		const snap = await this.db.database().ref('restricted_access/streaming/').once('value');
		const result = snap.val();
		let audience = [] as string[];
		if (Array.isArray(result)) audience = result;
		else if (typeof result === 'object') audience = Object.values(result);
		return audience;
	}

	/**
	 * Get codeforce handle
	 * @returns {Promise<string>} handle
	 */
	async getCodeforceHandle(): Promise<CodeforceUser[]> {
		const snap = await this.db.database().ref('restricted_access/codeforce/').once('value');
		const users =  snap.val();
		return users;
	}

	/**
	 * Get current codeforce standing
	 * @param {string} handle
	 * @param {CodeforceRanking} ranking ranking
	 */
	async setCurrentCodeforceStanding(handle: string, ranking: CodeforceRanking): Promise<void> {
		await this.db.database().ref(`restricted_access/codeforce/${handle}/standing/`).set(ranking);
	}
}
