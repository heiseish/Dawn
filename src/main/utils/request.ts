import rp from 'request-promise';
import {
	WAIT_TIME_FOR_EXTERNAL_API
} from '../environment';

/**
 * Request API with fixed timeout. Prevent hanging request query
 * @param options Requestion options
 */
const externalAPIRequest = async (options: rp.OptionsWithUri): Promise<any> => {
	options.timeout =  WAIT_TIME_FOR_EXTERNAL_API;
	options.headers = {
		'User-Agent': 'Request-Promise',
	};
	options.json =  true; // Automatically parses the JSON string in the response,
	try {
		const res = await rp(options);
		return res;
	} catch (e) {
		return Promise.reject(e);
	}
};

export {
	externalAPIRequest
};
