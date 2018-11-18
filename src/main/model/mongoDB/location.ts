import mongoose from './db'
const Schema = mongoose.Schema
export default new Schema({
	lat: Number || String,
	long: Number || String,
	formattedAddress: String,
}, { strict: false, _id : false  })
