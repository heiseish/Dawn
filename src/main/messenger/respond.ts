import { randomConfusedMessage } from '../lib/string';
import { waitToDo } from '../utils/timer';
import sendListTemplate from './api/listTemplate';
import sendMediaTemplate from './api/mediaTemplate';
import message from './api/message';
import sendQuickReply from './api/quickReply';

const TIME_WAITED_BEFORE_CONFIRMING = 3000;

/**
* Respond in facebook messenger
* @param {userType} user
*/
export default async (user: userType): Promise<void> => {
	try {
		const fbId = user.id.replace('mes', '');
		const response = user.response;
		const imageId = response.image && !response.image.includes('http');
		// Messenger SDK require exact object structure. Thus the need to convert mongoose object to js object
		if (!response.answerable) {
			await message(fbId, randomConfusedMessage(user.name.first));
		} else if (response.simpleText && !response.image && !imageId) {
			await message(fbId, response.simpleText);
		} else if (response.simpleText && (response.image || imageId)) {
			const media: MessengerTextMedia = {
				type: 'image',
				// url: response.image,
				id: response.image,
			};
			/** Need more general cases here */
			let button: MessengerTextButton = null;
			if (response.url) {
				button = {
					title: 'View Article',
					url: response.url,
				};
			}
			await sendMediaTemplate(fbId, media, button);
			await message(fbId, response.simpleText);

		} else if (response.cascadeText) {
			if (response.cascadeText.length == 1) {
				const topArticle = response.cascadeText[0];

				message(fbId, topArticle.title, () => {
					const media: MessengerTextMedia = {
						type: 'image',
						url: topArticle.image_url,
					};
					let button: MessengerTextButton = null;

					if (topArticle.buttons[0].url) {
						button = {
							title: 'View Article',
							url: topArticle.buttons[0].url,
						};
					}
					sendMediaTemplate(fbId, media, button);
				});
			} else {
				await sendListTemplate(fbId, response.cascadeText);
			}
		} else if (response.multipleText) {
			for (const text of response.multipleText) { await message(fbId, text); }
		}
		waitToDo(TIME_WAITED_BEFORE_CONFIRMING, sendResponseConfirmation.bind(null, fbId));
	} catch (e) {
		return Promise.reject(e);
	}

};

/**
* send a confirmation for the bot's response
* @param {string} fbId
*/
const sendResponseConfirmation = (fbId: string) => {
	sendQuickReply(fbId, "Is this what you's asking for?",
	{
		content_type: 'text',
		title: 'Yup!',
		payload: 'CORRECT_SERVICE',
		image_url: 'https://vignette.wikia.nocookie.net/whentheycry/images/2/2a/Check.png/revision/latest?cb=20120629163937',
	},
	{
		content_type: 'text',
		title: 'Nope!',
		payload: 'INCORRECT_SERVICE',
		image_url: 'https://www.clker.com/cliparts/8/3/3/4/1195445190322000997molumen_red_round_error_warning_icon.svg.med.png',
	});
};
