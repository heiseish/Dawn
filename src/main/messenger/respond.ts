import sendMediaTemplate from './api/mediaTemplate';
import message from './api/message';
import sendQuickReply from './api/quickReply';

const TIME_WAITED_BEFORE_CONFIRMING = 3000;

/**
* Respond in facebook messenger
* @param {dawn.Context} ctx
*/
export default async (ctx: dawn.Context): Promise<void> => {
	try {
		const id = ctx.id;
		const response = ctx.response;
		// Messenger SDK require exact object structure. Thus the need to convert mongoose object to js object
		if (response.text && !response.image) {
            for (let txt of response.text) {
                await message(id, txt);
            }
            return;
        } 
        if (response.text && response.image && response.text.length == response.image.length) {
            for (let i = 0; i < response.text.length; ++i) {
                const media: Facebook.MessengerTextMedia = {
                    type: 'image',
                    id: response.image[i],
                };
                /** Need more general cases here */
                let button: Facebook.MessengerTextButton = null;
                if (response.url && response.url.length > i) {
                    button = {
                        title: 'View Article',
                        url: response.url[i],
                    };
                    message(id, response.text[i], () => {
                        sendMediaTemplate(id, media, button);
                    });
                } else {
                    await sendMediaTemplate(id, media, button);
                    await message(id, response.text[i]);
                }
            }
        } 
		// waitToDo(TIME_WAITED_BEFORE_CONFIRMING, sendResponseConfirmation.bind(null, id));
	} catch (e) {
		return Promise.reject(e);
	}

};

/**
* send a confirmation for the bot's response
* @param {string} id
*/
const sendResponseConfirmation = (id: string) => {
	sendQuickReply(id, "Is this what you's asking for?",
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
