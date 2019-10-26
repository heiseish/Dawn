import { randomResponseToThanksMessage } from '../lib/string';

export default class Thanks implements dawn.Action {
    public name = 'thanks';
    /**
     * Reply to people thanking
     * @param {dawn.Context} user
     * @return parsed User
     */
    public execute = async (user: dawn.Context): Promise<dawn.Context> => {
        user.response = {
            text: [await randomResponseToThanksMessage(user.name.first)],
        };
        return user;
    };
    description: 'Function to thanks user';
}

