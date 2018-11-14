"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const environment_1 = require("./main/environment");
const rx_1 = __importDefault(require("./main/externalApis/rx"));
const hq_1 = __importDefault(require("./main/hq"));
const preprocess_1 = require("./main/preprocess");
const telegram_1 = __importDefault(require("./main/telegram"));
/**
 * REST API
 */
class App {
    /**
     * Constructor for main REST API
     * @return an App instance
     */
    constructor(port) {
        this.headquarter = new hq_1.default();
        this.express = express_1.default();
        this.express.listen(port);
        this.express.use(body_parser_1.default.json());
        this.express.use(body_parser_1.default.urlencoded({ extended: true }));
        this.loadFacebookEndpoint();
        this.loadPingEndpoints();
        this.loadStreamingEndpoint();
        this.loadTelegramEndpoint();
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
            preprocess_1.messengerPreprocess(req.body.entry[0].messaging, (event) => this.headquarter.receive('messenger', event));
            res.sendStatus(200);
        });
    }
    /**
     * Endpoint for telegram
     */
    loadTelegramEndpoint() {
        telegram_1.default.on('message', (msg) => {
            const result = preprocess_1.telegramPreprocess(msg);
            if (result) {
                this.headquarter.receive('telegram', msg);
            }
        });
    }
    /**
     * Endpoint for streaming API
     */
    loadStreamingEndpoint() {
        if (process.env.NODE_ENV === 'production')
            rx_1.default();
    }
}
exports.default = App;
//# sourceMappingURL=App.js.map