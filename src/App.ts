import bodyParser from 'body-parser';
import express from 'express';
import {
	FB_VERIFY_TOKEN,
} from './main/environment';
import Logger from './main/logger';

import CodeforceStream from './main/streaming/codeforce';
import MorningNasa from './main/streaming/morningNasa';
import TwitterStreaming from  './main/streaming/twitter';

import Headquarter from './main/hq';
import Cache from './main/model/cache';
import Firebase from './main/model/firebase';
import MongoDB from './main/model/mongoDB';
import {
	messengerPreprocess,
	telegramPreprocess,
} from './main/preprocess';
import Sweeper from './main/sweeper';
import telegramBot from './main/telegram';
/**
* REST API
*/
export default class App {
	private express;
	private headquarter;
	private streams;
	private firebase;
	private mongodb;
	private UserDB;
	private cache;
	private sweeper;
	/**
	* Constructor for main REST API
	*/
	constructor() {
		this.express = express();
		this.sweeper = new Sweeper();
		this.headquarter = new Headquarter();
	}

	/**
	* Configure setting for express
	* @param {string | number} port port that express should be listening to
	*/
	configureExpress(port: string | number): void {
		if (typeof port === 'string') {
			port = parseInt(port);
		}
		this.express.listen(port);
		this.express.use(bodyParser.json());
		this.express.use(bodyParser.urlencoded({extended: true}));
	}
	/**
	* Fire up endpoint listener
	* @throws error if express is appropriately set up beforehand.
	*/
	async startServer(): Promise<void> {
		if (!this.express) {
			throw new Error('Express is not set up when firing endpoint listener');
		}
		this.loadFacebookEndpoint();
		this.loadPingEndpoints();
		this.loadTelegramEndpoint();

		this.loadStreamingEndpoint(await this.firebase.getStreamingAudience());
	}

	/**
	* Establish connection to database
	*/
	async setUpDatabase(): Promise<void> {
		this.firebase = new Firebase();
		this.mongodb = new MongoDB();
		this.UserDB = await this.mongodb.users;
		this.cache = new Cache(this.UserDB);
		this.sweeper.add(this.cache.close);
		this.sweeper.add(this.mongodb.terminateConnection);
		this.sweeper.add(this.firebase.terminateConnection);

	}

	/**
	* Endpoint for ping related service
	*/
	private loadPingEndpoints(): void {
		this.express.get('/', (req, res) =>  res.status(200).json({ name: 'potts-backend' }));
		this.express.get('/ping', (req, res) => res.sendStatus(200));
	}

	/**
	* Endpoint for facebook messenger
	*/
	private loadFacebookEndpoint(): void {
		this.express.get('/fb', (req, res) => {
			if (!FB_VERIFY_TOKEN) {
				throw new Error('missing FB_VERIFY_TOKEN');
			}
			if (req.query['hub.mode'] === 'subscribe' &&
			req.query['hub.verify_token'] === FB_VERIFY_TOKEN) {
				res.status(200).send(req.query['hub.challenge']);
			} else {
				res.sendStatus(403);
			}
		});
		this.express.post('/fb', (req, res) => {
			messengerPreprocess(req.body.entry[0].messaging,
					(event) => this.headquarter.receive('messenger', event, this.mongodb.users, this.cache));
			res.sendStatus(200);
		});
	}

	/**
	* Endpoint for telegram
	*/
	private loadTelegramEndpoint(): void {
		telegramBot.on('message', (msg) => {
			const result = telegramPreprocess(msg);
			if (result) {
				this.headquarter.receive('telegram', msg, this.mongodb.users, this.cache);
			}
		});
		telegramBot.on('polling_error', (err) =>
			Logger.error(err)
		);
	}

	/**
	*
	* @param {string[]} people list of people to send to
	*/
	private loadStreamingEndpoint(people: string[]): void {
		if (process.env.NODE_ENV === 'production') {
			this.streams = [];
			this.streams.push(new TwitterStreaming());
			this.streams.push(new MorningNasa());
			this.streams.push(new CodeforceStream(this.firebase));

			for (const st of this.streams) st.startStreaming(people);
			for (const st of this.streams) this.sweeper.add(st.stopStreaming);
		}
	}

}
