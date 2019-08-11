/**
* Mock a post request from messenger SDK
* @param {string} id ID of the sender
* @param {any} payload type and content of POST request
*/
const messengerPOSTRequest = (id: string, payload: any): any => {
	return {
        entry: [
            {
                messaging: [
                        {
                        sender: {
                            id,
                        },
                        message: {
                            text: payload.text,
                        },
                    }
                ],
            },

        ],
		

	};
};

export {
	messengerPOSTRequest,
};
