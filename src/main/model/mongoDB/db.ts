import Logger from '../../logger'
import mongoose from 'mongoose'
import {
	MONGO_DB_URI,
} from '../../environment'
const options = {
	autoReconnect: true,
	reconnectTries: 100, // Never stop trying to reconnect
	reconnectInterval: 500, // Reconnect every 500ms
	poolSize: 10, // Maintain up to 10 socket connections
	bufferMaxEntries: 0,
	useNewUrlParser: true,
}
mongoose.connect(MONGO_DB_URI, options).then(
	() => Logger.info('Established connection to mlab'),
	(err) => Logger.error(err),
)
mongoose.set('useCreateIndex', true);
mongoose.connection.on('reconnectFailed', () => Logger.error('Mongoose attemp to recoonect failed'))
export default mongoose
