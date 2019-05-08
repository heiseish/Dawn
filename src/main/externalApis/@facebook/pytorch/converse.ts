import request from 'request';
const PYTORCH_SERVER = 'https://dlinterface.herokuapp.com/conversation';
import rp from 'request-promise';

const generateDataPackage = (sentence: string) => ({
	method: 'POST',
	uri: PYTORCH_SERVER,
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
