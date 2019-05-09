import rp from 'request-promise';
import {CONVERSE_SERVER} from '../../../environment';

const generateDataPackage = (sentence: string) => ({
	method: 'POST',
	uri: CONVERSE_SERVER,
	form: {
        sentence,
    },
});

/**
 * conversation if intent classified is unclear
 * @param {string} sentence sentence to be replied back to
 * @return {string} reply to the sentence
 */
const converse = async (sentence: string): Promise<string> => {
	try {
		const ans = await rp(generateDataPackage(sentence));
		return ans;
	} catch (e) {
		return Promise.reject(e);
	}

};

export default converse;
