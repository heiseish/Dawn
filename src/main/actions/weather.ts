import { getWeatherMessage } from '../3rdparty/weather';

export default class Weather implements dawn.Action {
    public name = 'weather';
    /**
     * Inform user of the current weather
     * @param {dawn.Context} user
     * @return PRomise containing updated user
     */
    public execute = async (user: dawn.Context): Promise<dawn.Context> => {
        try {
            const {
                current,
                summary,
                imageId,
            } = await getWeatherMessage();
            user.response = {
                text: [current + summary],
            };
            if (user.platform == 'messenger') {
                user.response.image = [imageId];

            }
            return user;
        } catch (e) {
            return Promise.reject(e);
        }
    };
    description: 'Function to inform about weather information';
}
