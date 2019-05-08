if (process.env.NODE_ENV === 'production') require('dotenv').load();
import cryptoJSON from 'crypto-json';

const cipher = process.env.CIPHER;
const passKey = process.env.PASSKEY;
const encoding = 'hex';

/**
 * Encode JSON object with hidden cipher
 * @param {any} object
 */
const encrypt = (object: any) =>  {
	if (typeof object !== 'object') {
		throw new Error('Cannot encrypt non-object');
	}
	return cryptoJSON.encrypt(object, passKey, {
		algorithm: cipher,
		encoding,
		keys: [],
	});
};
/**
 * Decode JSON object with cipher
 * @param {any} object
 */
const decrypt = (object: any) => {
	if (typeof object !== 'object') {
		throw new Error('Cannot decrypt non-object: ' + object);
	}
	return cryptoJSON.decrypt(object, passKey, {
		algorithm: cipher,
		encoding,
		keys: [],
	});
};
export {
	encrypt,
	decrypt,
};
