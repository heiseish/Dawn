/**
 * Create name schema
 * @param mongoose mongdb connection
 */
const createNameSchema = (mongoose: any):any => {
	const Schema = mongoose.Schema
	return new Schema({
		first: String,
		last: String,
		full: { type: String, index: true},
	}, { strict: false, _id : false  })
}
export default createNameSchema

