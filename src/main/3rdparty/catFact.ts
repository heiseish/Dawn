const CAT_FACT_URI = 'https://catfact.ninja/fact';
import {
	externalAPIRequest
} from '../utils/request';
/**
 * Retrieve a random cat from cat fact API
 * @returns {Promise<string>} promise with cat fact string
 */
export default async (): Promise<string> => {
	try {
		const result = await externalAPIRequest({ uri : CAT_FACT_URI});
		if (result.fact.length >= 320) {
			return 'Cat is an animal😺';
		} else {
			let fact: string = result.fact[0].toLowerCase() + result.fact.substring(1);
			fact = fact.substring(0, fact.length - 1);
			return `Do you know that ${fact}?`;
		}
	} catch (e) {
		return Promise.reject(e);
	}
};
