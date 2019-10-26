import mongoose from 'mongoose';
import docSchema from './doc';
import entitySchema from './entity';
import locationSchema from './location';
import nameSchema from './name';
import responseSchema from './response';
import textSchema from './text';

type userMongooseType = dawn.Context & mongoose.Document;

export default class UserDB implements Mongoose.UserDatabase {
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
		this.model = mongoose.model('User', this.schema) as mongoose.Model<userMongooseType>;
	}

	/**
	 * Update the user in database
	 * @param {string} id id of the user to be updated
	 * @param {dawn.Context} user updated information of the user
	 * @returns updated user
	 */
	updateUser = (id: string, user: dawn.Context): Promise<dawn.Context | null> => {
		return new Promise((resolve, reject) => {
			this.model.findOneAndUpdate({id: new RegExp(id, 'i')}, user).lean().exec((err, newUser) => {
				if (err) reject(err);
				if (newUser) resolve(newUser);
				else {
					this.addUser(user);
					return user;
				}
			});
		});
	}

    findOrCreateUser = async (ctx: dawn.Context): Promise<dawn.Context> => {
        try {
            let user = await this.findUser(ctx.id);
            if (user != null) {
                return user;
            }
            return await this.addUser(ctx);
        } catch(e) {
            return Promise.reject(e);
        }
       
    }
	/**
	 * Find user in the database
	 * @param id string
	 * @returns User if user if found, null otherwise
	 */
	findUser = (id: string): Promise<null | dawn.Context> => {
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
	 * @returns {Promise<void>} OK string if there is no error
	 */
	addUser = (user: dawn.Context): Promise<dawn.Context> => {
		return new Promise((resolve, reject) => {
			this.model.create(user, (err, res) => {
				if (err) reject(err);
				else resolve(res);
			});
		});
	}
}
