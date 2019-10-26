
import getWCSchedule from '../3rdparty/worldCup';

export default class WorldCup implements dawn.Action {
    public name = 'worldCup';
    /**
     * Return today world cup schedule
     * @param {dawn.Context} user
     * @return Promise containing updated response
     */
    public execute = async (user: dawn.Context): Promise<dawn.Context> => {
        try {
            const message: string = await getWCSchedule();
            user.response = {
                text: [message],
            };
            return user;
        } catch (e) {
            return Promise.reject(e);
        }
    
    };
    description: 'Function to inform user of world cup';
}
