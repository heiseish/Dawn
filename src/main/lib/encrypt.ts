import dotenv from 'dotenv'
if (process.env.NODE_ENV !== 'production') 
	dotenv.config();
import cryptoJSON from 'crypto-json';
import {
	CIPHER,
	PASSKEY
} from '../environment'
const encoding = 'hex';

/**
 * Encode JSON object with hidden CIPHER
 * @param {object} object to-be-encrypted object
 * @returns {object} encrypted object
 */
const encrypt = (object: {}): {} =>  {
	if (typeof object !== 'object') {
		throw new Error('Cannot encrypt non-object');
	}
	return cryptoJSON.encrypt(object, PASSKEY, {
		algorithm: CIPHER,
		encoding,
		keys: [],
	});
};
/**
 * Decode JSON object with CIPHER
 * @param {object} object to-be-decrypted object
 * @returns {object} decrypted object
 */
const decrypt = (object: {}): {} => {
	if (typeof object !== 'object') {
		throw new Error('Cannot decrypt non-object: ' + object);
	}
	return cryptoJSON.decrypt(object, PASSKEY, {
		algorithm: CIPHER,
		encoding,
		keys: [],
	});
};
export {
	encrypt,
	decrypt,
};
