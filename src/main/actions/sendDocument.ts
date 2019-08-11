import geocoder from 'geocoder';
import idx from 'idx';
import getRandomGif from '../3rdparty/giphy';

export default class Document implements dawn.Action {
    public name = 'sendDocument';
    /**
     * Handle document from messenger
     * @param {dawn.Context} user
     * @return updated user
     * @throws if gif api or geocoder api fails
     */
    public execute = async (user: dawn.Context): Promise<dawn.Context> => {
        try {
            switch (user.document.type) {
            case 'image':
                const res = await getRandomGif();
                user.response = {
                    image:  [res],
                    url: [res]
                };
                break;
    
            case 'video':
                user.response = {
                    text: ['Nice video!'],
                };
                break;
    
            case 'location':
                geocoder.reverseGeocode(user.location.lat, user.location.long, (err, data) => {
                    if (err) {
                        return Promise.reject(err);
                    }
                    if (data.result && data.result.length > 0 && data.result[0].formattedAddress) {
                        user.location.formattedAddress = data.result[0].formattedAddress;
                    }

                    user.response = {
                        text: ['I see that you are @ ' + user.location.formattedAddress + ' right now!'],
                    };
                });
                break;
    
            case 'QUICK_REPLY':
                
                break;
    
            case 'audio':
                user.response = {
                    text: ['Nice voice!'],
                };
                break;
            }
            return user;
        } catch (e) {
            return Promise.reject(e);
        }
    };
    description: 'Function to reply when user send document';
}

