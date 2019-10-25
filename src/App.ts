import bodyParser from 'body-parser';
import express = require('express');
import {
    FB_VERIFY_TOKEN,
    NODE_ENV
} from './main/environment';
import Logger from './main/logger';

import CodeforceStream from './main/streaming/codeforce';
import MorningNasa from './main/streaming/morningNasa';
import TwitterStreaming from  './main/streaming/twitter';

import { markSeen, typingOff, typingOn } from './main/messenger/api/senderAction';

import Headquarter from './main/headquarter';

import Firebase from './main/database/firebase';
import MongoDB from './main/database/mongoDB';
import preprocess from './main/preprocess';
import Sweeper from './main/sweeper';
import { telegramEndpoint } from './main/telegram';

/**
* REST API
*/
export default class App implements dawn.App {
	private express: express.Application;
	private headquarter: Headquarter;
	private streams: dawn.Streamer[];
	private firebase: Firebase;
	private mongodb: MongoDB;
	
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
	* Configure setting for express
	* @param {string | number} port port that express should be listening to
	*/
	configureExpress(port: string | number): void {
        let numericPort:number;
		if (typeof port === 'string') {
			numericPort = parseInt(port);
		} else {
            numericPort = port;
        }
		this.express.listen(numericPort);
		this.express.use(bodyParser.json());
		this.express.use(bodyParser.urlencoded({extended: true}));
	}
	/**
	* Fire up endpoint listener
	* @returns void
	* @throws error if express is appropriately set up beforehand.
	*/
	async startServer(): Promise<void> {
		if (!this.express) {
			Logger.error('Express is not set up when firing endpoint listener', App.name);
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
	async setUpDatabase(): Promise<void> {
		this.firebase = new Firebase();
        this.mongodb = new MongoDB();
        this.headquarter.setUserDB(this.mongodb.users);
		this.sweeper.add(this.mongodb.terminateConnection);
		this.sweeper.add(this.firebase.terminateConnection);

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
            let messagingEvents = req.body.entry[0].messaging;
            for (let event of messagingEvents) {
                const senderId = event.sender.id;
                markSeen(senderId);
                typingOn(senderId);
                let result = preprocess('messenger')(event);
                this.headquarter.receive(result);
                typingOff(senderId);	
            }
			res.sendStatus(200);
		});
	}

	/**
	* Endpoint for telegram
	* @returns void
	*/
	private loadTelegramEndpoint(): void {
		telegramEndpoint.on('message', (msg) => {
			let result = preprocess('telegram')(msg);
			this.headquarter.receive(result);
		});
		telegramEndpoint.on('polling_error', (err) =>
			Logger.error(err.toString())
		);
	}

	/**
	* Loading streaming service
	* @param {dawn.StreamPerson[]} people list of people to send to
	*/
	private loadStreamingEndpoint(people: dawn.StreamPerson[]): void {
        if (NODE_ENV != 'local') {
            this.streams = [];
            this.streams.push(new TwitterStreaming());
            this.streams.push(new MorningNasa());
            this.streams.push(new CodeforceStream(this.firebase));

            for (const st of this.streams) st.startStreaming(people);
            for (const st of this.streams) this.sweeper.add(st.stopStreaming);
        }
		
	}

}
