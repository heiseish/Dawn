import { Translate } from '@google-cloud/translate';
import { GOOGLE_APPLICATION_CREDENTIALS, GOOGLE_PROJECT_ID } from '../../environment';
import Logger from '../../logger';
import { USING_TRANSLATION } from './controller';

/**
 * Translate text using google eapi
 * @param {string} textToTranslate
 * @param {string} languageToTranslateTo
 */
const translate = (textToTranslate: string, languageToTranslateTo = 'en'): Promise<string> => {
	return new Promise((resolve, reject) => {
		if (!USING_TRANSLATION) { resolve(textToTranslate); } else {
			Logger.info(`Translating ${textToTranslate} to ${languageToTranslateTo}...`);
			const PROJECT_ID = GOOGLE_PROJECT_ID;
			const translate = new Translate({
				projectId: PROJECT_ID,
				keyFilename: GOOGLE_APPLICATION_CREDENTIALS,
			});
			translate
				.translate(textToTranslate, languageToTranslateTo)
				.then((results) => resolve(results[0]))
				.catch((err) => reject(err));
		}

	});
};
export {
	translate,
};
