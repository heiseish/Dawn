/**
 * Not yet implemented
 */
import dotenv from 'dotenv';
import { BuildOptions, DataTypes, Model, Sequelize  } from 'sequelize';
const POSTGRES_DATABASE_URI =  'postgres://yfbsqmlbjcgesh:1813d162aac4b69e75865\
a2b19b98e16af1f29410d24b962cc7061c053b3651a@ec2-54-197-232-203.compute-1.\
amazonaws.com:5432/d6o7o6jtb86chc';

declare type cascadeTextType = Array<{
	title: string,
	image: string,
	image_url: string,
	buttons: cascadeTextButton[],
}>;

declare interface cascadeTextButton {
	title: string;
	type: 'web_url';
	url: string;
	webview_height_ratio: 'tall' | 'short';
}

interface EventPostgresModel extends Model {
	readonly id: string | number;
	name?: {
		first?: string,
		last?: string,
		full?: string,
	};
	lastLocation?: {
		lat?: number | string,
		long?: number | string,
		formattedAddress?: string,
	};
	lastDoc?: {
		value?: number | string,
		type?: 'image' | 'video' | 'location' | 'QUICK_REPLY' | 'audio',
	};
	lastText?: string;
	text?: Text[];
	entity?: {
		lastIntent?: string,
		sentiment?: string,
	};
	response?: {
		answerable?: Boolean,
		simpleText?: string | null,
		image?: string,
		cascadeText?: cascadeTextType,
		multipleText?: string[],
		url?: string,
	};
	locale: string;
}

// Need to declare the static model so `findOne` etc. use correct types.
type EventModelStatic = typeof Model & (new (values?: object, options?: BuildOptions) => EventPostgresModel; )

export default class PostgresDatabase {
	private seq: Sequelize;
	private readonly Event: EventModelStatic;
	constructor(database_uri: string = POSTGRES_DATABASE_URI) {
		this.seq = new Sequelize(database_uri, {
			dialect: 'postgres',
			protocol: 'postgres',
			dialectOptions: {
				ssl: true,
			},
		});
		this.Event = this.seq.define('User', {
			id: {
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
		}) as EventModelStatic;
	}

	createEvent = (): void => {
		this.Event.create({

		});
	}

}
