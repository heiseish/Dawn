"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const idx_1 = __importDefault(require("idx"));
const rxjs_1 = require("rxjs");
const _twitter_1 = require("../3rdparty/@twitter");
const logger_1 = __importDefault(require("../logger"));
const _1 = __importDefault(require("./"));
const POKEMONGO_TWITTER = '2839430431';
const WYK_TWITTER = '44680622';
const MY_TWITTER = '700623960';
const KUROKY_TWITTER = '949785073';
const MATUM_TWITTER = '2773714579';
const GH_TWITTER = '1574718510';
const MIRACLE_TWITTER = '3907466052';
const MC_TWITTER = '2870796886';
const NORDAX_TWITTER = '795002060643205124';
const listOfStreams = [
    POKEMONGO_TWITTER,
    WYK_TWITTER,
    MY_TWITTER,
    KUROKY_TWITTER,
    MATUM_TWITTER,
    GH_TWITTER,
    MIRACLE_TWITTER,
    MC_TWITTER,
    NORDAX_TWITTER,
];
/**
 * Class for twitter streaming
 */
class TwitterStreaming {
    /**
     * Constructor for twitter streaming class
     */
    constructor() {
        /**
         * Terminate the stream
         */
        this.stopStreaming = () => {
            logger_1.default.warn('Stopping Twitter stream');
            this.twitterStreaming.unsubscribe();
        };
        this.streaming = rxjs_1.Observable.create((observer) => {
            const twitter = _twitter_1.client.stream('statuses/filter', { follow: listOfStreams.join(',') });
            twitter.on('data', (tweet) => {
                if (listOfStreams.includes(tweet.user.id_str)) {
                    observer.next({
                        name: tweet.user.name,
                        text: tweet.text,
                        image: idx_1.default(tweet, (_) => _.extended_entities.media[0].media_url_https) || null,
                    });
                }
            });
            twitter.on('error', (error) => {
                observer.error(error);
            });
            return () => {
                twitter.destroy();
            };
        });
    }
    /**
     * Start listenning to twitter streaming api
     * @param {string[]} people list of people to send message to
     */
    startStreaming(people) {
        logger_1.default.info('Starting twitter stream');
        this.twitterStreaming = this.streaming.subscribe({
            next: (x) => {
                _1.default({
                    text: x.name + ': ' + x.text,
                    image: x.image,
                }, people);
            },
            error: (err) => logger_1.default.error('something wrong occurred: ' + err),
            complete: () => logger_1.default.info('done'),
        });
    }
}
exports.default = TwitterStreaming;
//# sourceMappingURL=twitter.js.map