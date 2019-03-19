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
const express_1 = __importDefault(require("express"));
const environment_1 = require("./main/environment");
const twitter_1 = __importDefault(require("./main/streaming/twitter"));
const morningNasa_1 = __importDefault(require("./main/streaming/morningNasa"));
const codeforce_1 = __importDefault(require("./main/streaming/codeforce"));
const hq_1 = __importDefault(require("./main/hq"));
const preprocess_1 = require("./main/preprocess");
const telegram_1 = __importDefault(require("./main/telegram"));
const firebase_1 = __importDefault(require("./main/model/firebase"));
const mongoDB_1 = __importDefault(require("./main/model/mongoDB"));
const sweeper_1 = __importDefault(require("./main/sweeper"));
const cache_1 = __importDefault(require("./main/model/cache"));
/**
* REST API
*/
class App {
    /**
    * Constructor for main REST API
    */
    constructor() {
        this.express = express_1.default();
        this.sweeper = new sweeper_1.default();
        this.headquarter = new hq_1.default();
    }
    /**
    * Endpoint for ping related service
    */
    loadPingEndpoints() {
        this.express.get('/', (req, res) => res.status(200).json({ name: 'potts-backend' }));
        this.express.get('/ping', (req, res) => res.sendStatus(200));
    }
    /**
    * Endpoint for facebook messenger
    */
    loadFacebookEndpoint() {
        this.express.get('/fb', (req, res) => {
            if (!environment_1.FB_VERIFY_TOKEN)
                throw new Error('missing FB_VERIFY_TOKEN');
            if (req.query['hub.mode'] === 'subscribe' &&
                req.query['hub.verify_token'] === environment_1.FB_VERIFY_TOKEN)
                res.status(200).send(req.query['hub.challenge']);
            else
                res.sendStatus(403);
        });
        this.express.post('/fb', (req, res) => {
            preprocess_1.messengerPreprocess(req.body.entry[0].messaging, (event) => this.headquarter.receive('messenger', event, this.mongodb.users, this.cache));
            res.sendStatus(200);
        });
    }
    /**
    * Endpoint for telegram
    */
    loadTelegramEndpoint() {
        telegram_1.default.on('message', (msg) => {
            const result = preprocess_1.telegramPreprocess(msg);
            if (result)
                this.headquarter.receive('telegram', msg, this.mongodb.users, this.cache);
        });
    }
    /**
    *
    * @param {string[]} people list of people to send to
    */
    loadStreamingEndpoint(people) {
        // if (process.env.NODE_ENV === 'production') {
        this.streams = [];
        this.streams.push(new twitter_1.default());
        this.streams.push(new morningNasa_1.default());
        this.streams.push(new codeforce_1.default(this.firebase));
        for (let st of this.streams)
            st.startStreaming(people);
        for (let st of this.streams)
            this.sweeper.add(st.stopStreaming);
        // }
    }
    /**
    * Configure setting for express
    * @param {string | number} port port that express should be listening to
    */
    configureExpress(port) {
        if (typeof port === 'string')
            port = parseInt(port);
        this.express.listen(port);
        this.express.use(body_parser_1.default.json());
        this.express.use(body_parser_1.default.urlencoded({ extended: true }));
    }
    /**
    * Fire up endpoint listener
    * @throws error if express is appropriately set up beforehand.
    */
    startServer() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.express)
                throw new Error('Express is not set up when firing endpoint listener');
            this.loadFacebookEndpoint();
            this.loadPingEndpoints();
            this.loadTelegramEndpoint();
            this.loadStreamingEndpoint(yield this.firebase.getStreamingAudience());
        });
    }
    /**
    * Establish connection to database
    */
    setUpDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            this.firebase = new firebase_1.default();
            this.mongodb = new mongoDB_1.default();
            this.UserDB = yield this.mongodb.users;
            this.cache = new cache_1.default(this.UserDB);
            this.sweeper.add(this.cache.close);
            this.sweeper.add(this.mongodb.terminateConnection);
            this.sweeper.add(this.firebase.terminateConnection);
        });
    }
}
exports.default = App;
//# sourceMappingURL=App.js.map