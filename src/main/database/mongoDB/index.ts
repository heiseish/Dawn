import mongoose from 'mongoose';
import {
	MONGO_DB_URI,
} from '../../environment';
import Logger from '../../logger';
import UserDB from './user';
// import textSchema from './text'

export default class MongoDB {
	users: UserDB;
	private db: mongoose.Mongoose;
	private options: mongoose.ConnectionOptions = {
		autoReconnect: true,
		reconnectTries: 100, // Never stop trying to reconnect
		reconnectInterval: 500, // Reconnect every 500ms
		poolSize: 10, // Maintain up to 10 socket connections
		bufferMaxEntries: 0,
		useNewUrlParser: true,
	};
	/**
	 * Create a instance of mongo db
	 */
	constructor() {
		this.db = mongoose;
		this.db.connect(MONGO_DB_URI, this.options).then(
			() => Logger.info('Established connection to mongoDB', false, MongoDB.name),
			(err) => {
				Logger.error('Failed to establish connection to mongoDB:', MongoDB.name);
				Logger.error(err, MongoDB.name);
			}
		);
		this.db.set('useCreateIndex', true);
		this.users = new UserDB(this.db);
		// this.texts = textSchema(this.db)
	}

	/**
	 * Terminate connection to mongoose database
	 */
	terminateConnection = (): void => {
		Logger.warn('Closing connection to Mongo DB', MongoDB.name);
		this.db.connection.close();
	}

}
