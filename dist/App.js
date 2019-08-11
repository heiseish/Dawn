"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express = require("express");
const environment_1 = require("./main/environment");
const logger_1 = __importDefault(require("./main/logger"));
const codeforce_1 = __importDefault(require("./main/streaming/codeforce"));
const morningNasa_1 = __importDefault(require("./main/streaming/morningNasa"));
const twitter_1 = __importDefault(require("./main/streaming/twitter"));
const senderAction_1 = require("./main/messenger/api/senderAction");
const headquarter_1 = __importDefault(require("./main/headquarter"));
const firebase_1 = __importDefault(require("./main/model/firebase"));
const mongoDB_1 = __importDefault(require("./main/model/mongoDB"));
const preprocess_1 = __importDefault(require("./main/preprocess"));
const sweeper_1 = __importDefault(require("./main/sweeper"));
const telegram_1 = require("./main/telegram");
/**
* REST API
*/
class App {
    /**
    * Constructor for main REST API
    */
    constructor() {
        this.express = express();
        this.sweeper = new sweeper_1.default();
        this.headquarter = new headquarter_1.default();
    }
    /**
    * Configure setting for express
    * @param {string | number} port port that express should be listening to
    */
    configureExpress(port) {
        let numericPort;
        if (typeof port === 'string') {
            numericPort = parseInt(port);
        }
        else {
            numericPort = port;
        }
        this.express.listen(numericPort);
        this.express.use(body_parser_1.default.json());
        this.express.use(body_parser_1.default.urlencoded({ extended: true }));
    }
    /**
    * Fire up endpoint listener
    * @returns void
    * @throws error if express is appropriately set up beforehand.
    */
    startServer() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.express) {
                logger_1.default.error('Express is not set up when firing endpoint listener', App.name);
            }
            this.loadFacebookEndpoint();
            this.loadPingEndpoints();
            this.loadTelegramEndpoint();
            this.loadStreamingEndpoint(yield this.firebase.getStreamingAudience());
        });
    }
    /**
    * Establish connection to database
    * @returns void
    */
    setUpDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            this.firebase = new firebase_1.default();
            this.mongodb = new mongoDB_1.default();
            this.headquarter.setUserDB(this.mongodb.users);
            this.sweeper.add(this.mongodb.terminateConnection);
            this.sweeper.add(this.firebase.terminateConnection);
        });
    }
    /**
    * Endpoint for ping related service
    * returns void
    */
    loadPingEndpoints() {
        this.express.get('/', (req, res) => res.status(200).json({ name: 'potts-backend' }));
        this.express.get('/ping', (req, res) => res.sendStatus(200));
    }
    /**
    * Endpoint for facebook messenger
    * @returns void
    */
    loadFacebookEndpoint() {
        this.express.get('/fb', (req, res) => {
            if (!environment_1.FB_VERIFY_TOKEN) {
                throw new Error('missing FB_VERIFY_TOKEN');
            }
            if (req.query['hub.mode'] === 'subscribe' &&
                req.query['hub.verify_token'] === environment_1.FB_VERIFY_TOKEN) {
                res.status(200).send(req.query['hub.challenge']);
            }
            else {
                res.sendStatus(403);
            }
        });
        this.express.post('/fb', (req, res) => {
            let messagingEvents = req.body.entry[0].messaging;
            for (let event of messagingEvents) {
                const senderId = event.sender.id;
                senderAction_1.markSeen(senderId);
                senderAction_1.typingOn(senderId);
                let result = preprocess_1.default('messenger')(event);
                this.headquarter.receive(result);
                senderAction_1.typingOff(senderId);
            }
            res.sendStatus(200);
        });
    }
    /**
    * Endpoint for telegram
    * @returns void
    */
    loadTelegramEndpoint() {
        telegram_1.telegramEndpoint.on('message', (msg) => {
            let result = preprocess_1.default('telegram')(msg);
            this.headquarter.receive(result);
        });
        telegram_1.telegramEndpoint.on('polling_error', (err) => logger_1.default.error(err.toString()));
    }
    /**
    * Loading streaming service
    * @param {dawn.StreamPerson[]} people list of people to send to
    */
    loadStreamingEndpoint(people) {
        if (environment_1.NODE_ENV != 'local') {
            this.streams = [];
            this.streams.push(new twitter_1.default());
            this.streams.push(new morningNasa_1.default());
            this.streams.push(new codeforce_1.default(this.firebase));
            for (const st of this.streams)
                st.startStreaming(people);
            for (const st of this.streams)
                this.sweeper.add(st.stopStreaming);
        }
    }
}
exports.default = App;
//# sourceMappingURL=App.js.map