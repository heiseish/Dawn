"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const idx_1 = __importDefault(require("idx"));
const rxjs_1 = require("rxjs");
const _twitter_1 = require("./@twitter");
const logger_1 = __importDefault(require("../logger"));
const firebasedb_1 = __importDefault(require("../model/database/firebasedb"));
const account_1 = require("./../utils/account");
// @messenger
const message_1 = __importDefault(require("../messenger/api/message"));
const sendImage_1 = __importDefault(require("../messenger/api/sendImage"));
//@telegram
const api_1 = require("../telegram/api/");
const POKEMONGO_TWITTER = '2839430431';
const WYK_TWITTER = '44680622';
const MY_TWITTER = '700623960';
const listOfStreams = [
    POKEMONGO_TWITTER,
    WYK_TWITTER,
    MY_TWITTER,
];
class Streaming {
    constructor(listOfAudience = []) {
        this.listOfAudience = listOfAudience || null;
        if (listOfAudience) {
            const streaming = rxjs_1.Observable.create((observer) => {
                const twitter = _twitter_1.client.stream('statuses/filter', { follow: listOfStreams.join(',') });
                twitter.on('data', (tweet) => {
                    if (listOfStreams.includes(tweet.user.id_str)) {
                        observer.next({
                            name: tweet.user.name,
                            text: tweet.text,
                            image: idx_1.default(tweet, (_) => _.extended_entities.media[0].media_url_https) || null,
                            audience: listOfAudience,
                        });
                    }
                });
                twitter.on('error', (error) => {
                    observer.error(error);
                });
                return () => {
                    logger_1.default.warn('Closing twitter stream');
                };
            });
            this.twitterStreaming = streaming.subscribe({
                next: (x) => {
                    for (const userId of x.audience) {
                        let message;
                        let image;
                        const { platform, id, } = account_1.getPlatformAndId(userId);
                        if (platform === 'messenger') {
                            message = message_1.default;
                            image = sendImage_1.default;
                            // } else if (platform === 'telegram') {
                        }
                        else {
                            message = api_1.tlgMessage;
                            image = api_1.tlgImage;
                        }
                        message(id, `${x.name}: ${x.text}`);
                        if (x.image) {
                            image(id, x.image);
                        }
                    }
                },
                error: (err) => logger_1.default.error('something wrong occurred: ' + err),
                complete: () => logger_1.default.info('done'),
            });
        }
    }
    stopStreaming() {
        logger_1.default.warn('Resetting Twitter streaming because of a new stream');
        this.twitterStreaming.unsubscribe();
    }
    isStreaming() {
        return this.listOfAudience != null;
    }
}
const setUpStreamingApi = () => {
    let StreamingInstance = new Streaming();
    firebasedb_1.default.database().ref('restricted_access/streaming/').on('value', (snap) => {
        const result = snap.val();
        let audience;
        if (Array.isArray(result)) {
            audience = result;
        }
        else if (typeof result === 'object') {
            audience = Object.values(result);
        }
        if (StreamingInstance.isStreaming())
            StreamingInstance.stopStreaming();
        StreamingInstance = new Streaming(audience);
    }, (err) => {
        logger_1.default.error(err);
    });
};
exports.default = setUpStreamingApi;
//# sourceMappingURL=rx.js.map