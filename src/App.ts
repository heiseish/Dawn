import bodyParser from 'body-parser'
import express from 'express'
import { FB_VERIFY_TOKEN } from './main/environment'
import setUpStreamingApi from  './main/externalApis/rx'
import hq from './main/hq'
import {
	messengerPreprocess,
	telegramPreprocess,
} from './main/preprocess'
import telegramBot from './main/telegram'

/**
 * REST API
 */
export default class App {
	private express
	private headquarter
	/**
	 * Constructor for main REST API
	 * @return an App instance
	 */
	constructor(port: string | number) {
		this.headquarter = new hq()
		this.express = express()
		this.express.listen(port)
		this.express.use(bodyParser.json())
		this.express.use(bodyParser.urlencoded({extended: true}))

		this.loadFacebookEndpoint()
		this.loadPingEndpoints()
		this.loadStreamingEndpoint()
		this.loadTelegramEndpoint()
	}

	/**
	 * Endpoint for ping related service
	 */
	private loadPingEndpoints(): void {
		this.express.get('/', (req, res) =>  res.status(200).json({ name: 'potts-backend' }))
		this.express.get('/ping', (req, res) => res.sendStatus(200))

	}

	/**
	 * Endpoint for facebook messenger
	 */
	private loadFacebookEndpoint(): void {
		this.express.get('/fb', (req, res) => {
			if (!FB_VERIFY_TOKEN) { throw new Error('missing FB_VERIFY_TOKEN') }
			if (req.query['hub.mode'] === 'subscribe' &&
			  req.query['hub.verify_token'] === FB_VERIFY_TOKEN) { res.status(200).send(req.query['hub.challenge']) } else { res.sendStatus(403) }
		})
		this.express.post('/fb', (req, res) => {
			messengerPreprocess(req.body.entry[0].messaging, (event) => this.headquarter.receive('messenger', event))
			res.sendStatus(200)
		})
	}

	/**
	 * Endpoint for telegram
	 */
	private loadTelegramEndpoint(): void {
		telegramBot.on('message', (msg) => {
			const result = telegramPreprocess(msg)
			if (result) { this.headquarter.receive('telegram', msg) }
		})
	}

	/**
	 * Endpoint for streaming API
	 */
	private loadStreamingEndpoint(): void {
		if (process.env.NODE_ENV === 'production') setUpStreamingApi()
	}

}
