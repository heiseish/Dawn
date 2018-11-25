import mongoose from 'mongoose'
import {
	MONGO_DB_URI,
} from '../../environment'
import Logger from '../../logger'
import UserDB from './user'
import textSchema from './text'

export default class MongoDB {
	private db
	private texts
	private options = {
		autoReconnect: true,
		reconnectTries: 100, // Never stop trying to reconnect
		reconnectInterval: 500, // Reconnect every 500ms
		poolSize: 10, // Maintain up to 10 socket connections
		bufferMaxEntries: 0,
		useNewUrlParser: true,
	}

	public users
	/**
	 * Create a instance of mongo db
	 */
	constructor() {
		this.db = mongoose
		this.db.connect(MONGO_DB_URI, this.options).then(
			() => Logger.info('Established connection to mongoDB'),
			(err) => {
				Logger.error('Failed to establish connection to mongoDB: ')
				Logger.error(err)
			},
		)
		this.db.set('useCreateIndex', true)
		this.db.connection.on('reconnectFailed', () => Logger.error('Mongoose attemp to recoonect failed'))
		this.users = new UserDB(this.db)
		// this.texts = textSchema(this.db)
	}	
}