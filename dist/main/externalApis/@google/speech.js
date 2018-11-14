"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const speech_1 = __importDefault(require("@google-cloud/speech"));
const fs_1 = __importDefault(require("fs"));
const request_1 = __importDefault(require("request"));
const logger_1 = __importDefault(require("../../logger"));
const controller_1 = require("./controller");
const TEMP_AUDIO_PATH = 'temp.aac';
/**
 * Transcribe the audio into text
 * @param {URI of the recorded audio file} AudioUrl
 */
const speechToText = (AudioUrl) => {
    return new Promise((resolve, reject) => {
        if (!controller_1.USING_VISION) {
            resolve('Nice voice you\'ve got there!');
        }
        else {
            logger_1.default.info('Transcribing speech to text...');
            const client = new speech_1.default.SpeechClient();
            getAudio(AudioUrl).then(() => {
                const file = fs_1.default.readFileSync(TEMP_AUDIO_PATH);
                const audioBytes = file.toString('base64');
                // The audio file's encoding, sample rate in hertz, and BCP-47 language code
                const audio = {
                    content: audioBytes,
                };
                const config = {
                    encoding: 'LINEAR16',
                    sampleRateHertz: 16000,
                    languageCode: 'en-US',
                };
                const request = {
                    audio,
                    config,
                };
                // Detects speech in the audio file
                client
                    .recognize(request)
                    .then((data) => {
                    const response = data[0];
                    const transcription = response.results
                        .map((result) => result.alternatives[0].transcript)
                        .join('\n');
                    resolve(transcription);
                })
                    .catch((err) => {
                    reject(err);
                });
            });
        }
    });
};
exports.speechToText = speechToText;
const getAudio = (AudioUrl) => {
    return new Promise((resolve) => {
        request_1.default.head(AudioUrl, () => {
            request_1.default(AudioUrl).pipe(fs_1.default.createWriteStream(TEMP_AUDIO_PATH)).on('close', () => resolve());
        });
    });
};
//# sourceMappingURL=speech.js.map