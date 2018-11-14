import speech from '@google-cloud/speech'
import fs from 'fs'
import request from 'request'
import Logger from '../../logger'
import { USING_VISION } from './controller'
const TEMP_AUDIO_PATH = 'temp.aac'
/**
 * Transcribe the audio into text
 * @param {URI of the recorded audio file} AudioUrl
 */
const speechToText = (AudioUrl: string): Promise<string> => {
	return new Promise((resolve, reject) => {
		if (!USING_VISION) { resolve('Nice voice you\'ve got there!') } else {
			Logger.info('Transcribing speech to text...')
			const client = new speech.SpeechClient()

			getAudio(AudioUrl).then(() => {
				const file = fs.readFileSync(TEMP_AUDIO_PATH)
				const audioBytes = file.toString('base64')
				// The audio file's encoding, sample rate in hertz, and BCP-47 language code
				const audio = {
					content: audioBytes,
				}
				const config = {
					encoding: 'LINEAR16',
					sampleRateHertz: 16000,
					languageCode: 'en-US',
				}
				const request = {
					audio,
					config,
				}

				// Detects speech in the audio file
				client
					.recognize(request)
					.then((data) => {
						const response = data[0]
						const transcription = response.results
							.map((result) => result.alternatives[0].transcript)
							.join('\n')
						resolve(transcription)
					})
					.catch((err) => {
						reject(err)
					})
			})
		}

	})
}

const getAudio = (AudioUrl: string): Promise<any> => {
	return new Promise((resolve) => {
		request.head(AudioUrl, () => {
			request(AudioUrl).pipe(fs.createWriteStream(TEMP_AUDIO_PATH)).on('close', () => resolve())
		})
	})
}

export {
	speechToText,
}
