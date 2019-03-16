import * as tf from '@tensorflow/tfjs'
import '@tensorflow/tfjs-node'
import { characterLevelEmbed, toWordIntent } from './utils'
let model = null
const MODEL_FILE_PATH = 'file://dist/main/externalApis/@google/tensorflow/model.json'

/**
 * Predict the intent of a message
 * @param {string} s 
 * @return {{intent: string, confidence: number}}
 */
const predict = async (s: string): Promise<{intent: string, confidence: number}> => {
	try {
		if (!model) model = await tf.loadLayersModel(MODEL_FILE_PATH)
		const x = []
		x.push(characterLevelEmbed(s))
		const inputTensor: tf.Tensor<tf.Rank.R3> = tf.tensor3d(x)
		const res = await model.predict(inputTensor)
		const possibility: number[] =  Array.from(res.dataSync())
		const maxIdx: number = Math.max(...possibility)
		const idx: number = possibility.indexOf(maxIdx)
		const intent = toWordIntent(idx)
		return {
			intent,
        	confidence: maxIdx,
		}
	} catch (e) {
		return Promise.reject(e)
	}

}

export {
	predict,
}
