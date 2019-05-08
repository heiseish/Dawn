/**
 * createEntitySchema
 * @param mongoose mongodb connection
 */
const createEntitySchema = (mongoose: any): any => {
	const Schema = mongoose.Schema;
	return new Schema({
		lastIntent: String,
		sentiment: String,
	}, { strict: false , _id : false });
};
export default createEntitySchema;
