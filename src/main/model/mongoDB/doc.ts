/**
* createDocSchema
* @param mongoose mongodb connection
*/
const createDocSchema = (mongoose: any): any => {
	const Schema = mongoose.Schema;
	return new Schema({
		type: String,
		value: String,
	}, { strict: false , _id : false });
};

export default createDocSchema;
