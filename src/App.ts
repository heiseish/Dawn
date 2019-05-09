import bodyParser from 'body-parser';
import express = require('express');
import {
	FB_VERIFY_TOKEN,
} from './main/environment';
import Logger from './main/logger';

import CodeforceStream from './main/streaming/codeforce';
import MorningNasa from './main/streaming/morningNasa';
import TwitterStreaming from  './main/streaming/twitter';

import Headquarter from './main/headquarter';
import Cache from './main/model/cache';
import Firebase from './main/model/firebase';
import MongoDB from './main/model/mongoDB';
import {
	messengerPreprocess,
	telegramPreprocess,
} from './main/preprocess';
import Sweeper from './main/sweeper';
import { telegramEndpoint } from './main/telegram';

/**
* REST API
*/
export default class App implements Dawn.App {
	private express: express.Application;
	private headquarter: Headquarter;
	private streams: Dawn.Streamer[];
	private firebase: Firebase;
	private mongodb: MongoDB;
	private cache: Cache;
	private sweeper: Sweeper;
	/**
	* Constructor for main REST API
	*/
	constructor() {
		this.express = express();
		this.sweeper = new Sweeper();
		this.headquarter = new Headquarter();
	}

	/**
	* Endpoint for ping related service
	* returns void
	*/
	private loadPingEndpoints(): void {
		this.express.get('/', (req: express.Request, res: express.Response) =>  
			res.status(200).json({ name: 'potts-backend' }));
		this.express.get('/ping', (req, res) => res.sendStatus(200));
	}

	/**
	* Endpoint for facebook messenger
	* @returns void
	*/
	private loadFacebookEndpoint(): void {
		this.express.get('/fb', (req: express.Request, res: express.Response) => {
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
		this.express.post('/fb', (req: express.Request, res: express.Response) => {
			messengerPreprocess(req.body.entry[0].messaging,
					(event) => this.headquarter.receive('messenger', event, this.cache));
			res.sendStatus(200);
		});
	}

	/**
	* Endpoint for telegram
	* @returns void
	*/
	private loadTelegramEndpoint(): void {
		telegramEndpoint.on('message', (msg) => {
			const result = telegramPreprocess(msg);
			if (result) {
				this.headquarter.receive('telegram', msg,  this.cache);
			}
		});
		telegramEndpoint.on('polling_error', (err) =>
			Logger.error(err.toString())
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

	/**
	* Configure setting for express
	* @param {string | number} port port that express should be listening to
	*/
	public configureExpress(port: string | number): void {
		if (typeof port === 'string') {
			port = parseInt(port);
		}
		this.express.listen(port);
		this.express.use(bodyParser.json());
		this.express.use(bodyParser.urlencoded({extended: true}));
	}
	/**
	* Fire up endpoint listener
	* @returns void
	* @throws error if express is appropriately set up beforehand.
	*/
	public async startServer(): Promise<void> {
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
	* @returns void
	*/
	public async setUpDatabase(): Promise<void> {
		this.firebase = new Firebase();
		this.mongodb = new MongoDB();
		this.cache = new Cache(this.mongodb.users);
		this.sweeper.add(this.cache.close);
		this.sweeper.add(this.mongodb.terminateConnection);
		this.sweeper.add(this.firebase.terminateConnection);

	}

}
