/**
* Create a location schema
* @param mongoose mongodb connection
*/
const createLocationSchema = (mongoose: any): any => {
	const Schema = mongoose.Schema;
	return new Schema({
		lat: Number || String,
		long: Number || String,
		formattedAddress: String,
	}, { strict: false, _id : false  });
};

export default createLocationSchema;
