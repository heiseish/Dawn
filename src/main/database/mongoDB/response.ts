import singleCascadeTextSchema from './singleCascadeText';

/**
 * Create response schema
 * @param {any} mongoose mongdb connectoin
 */
const createResponseSchema =  (mongoose: any): any => {
	const Schema = mongoose.Schema;
	return  new Schema({
		answerable: Boolean,
		simpleText: String,
		image: String,
		imageId: Number,
		url: String,
		cascadeText: [singleCascadeTextSchema(mongoose)],
		multipleText: [String],
	}, { strict: false, _id : false  });
};

export default createResponseSchema;
