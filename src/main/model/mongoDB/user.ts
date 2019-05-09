import mongoose, { Mongoose } from 'mongoose';
import docSchema from './doc';
import entitySchema from './entity';
import locationSchema from './location';
import nameSchema from './name';
import responseSchema from './response';
import textSchema from './text';

type userMongooseType = userType & mongoose.Document;

export default class UserDB {
	private schema: mongoose.Schema;
	private model: mongoose.Model<userMongooseType>;
	constructor(mongoose: any) {
		this.schema = new mongoose.Schema({
			id: { type: String, require: true, unique: true, index: true },
			name: nameSchema(mongoose),
			lastLocation: locationSchema(mongoose),
			lastText: String,
			lastDoc: docSchema(mongoose),
			// text: [textSchema(mongoose)],
			entity: entitySchema(mongoose),
			response: responseSchema(mongoose),
			locale: String,
		}, { strict: false });
		this.model = <mongoose.Model<userMongooseType>>mongoose.model('User', this.schema);
	}

	/**
	 * Update the user in database
	 * @param {string} id id of the user to be updated
	 * @param {userType} user updated information of the user
	 * @returns updated user
	 */
	public updateUser = (id: string, user: userType): Promise<userType | null> => {
		return new Promise((resolve, reject) => {
			this.model.findOneAndUpdate({id: new RegExp(id, 'i')}, user).lean().exec((err, newUser) => {
				if (err) reject(err);
				if (newUser) resolve(newUser);
				else {
					this.addUser(user);
					return user;
				}
			});
		})
	}

	/**
	 * Find user in the database
	 * @param id string
	 * @returns User if user if found, null otherwise
	 */
	public findUser = (id: string): Promise<null | userType>=> {
		return new Promise((resolve, reject) => {
			this.model.findOne({id: new RegExp(id, 'i')}).lean().exec((err, user) => {
				if (err) reject(err);
				if (user) resolve(user);
				else resolve(null);
			});
		});
	}

	/**
	 * Add user to database
	 * @param user user to be add
	 * @returns {Promise<'OK'>} OK string if there is no error
	 */
	public addUser = (user: userType): Promise<'OK'> => {
		return new Promise((resolve, reject) => {
			this.model.create(user, (err, res) => {
				if (err) reject(err);
				else resolve('OK');
			});
		});
	}
}
