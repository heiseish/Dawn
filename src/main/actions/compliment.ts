import { randomResponseToComplimentMessage } from '../lib/string';

export default class Compliment implements dawn.Action {
    public name = 'compliment';
    /**
     * Reply to good bye message
     * @param {dawn.Context} user
     * @return updated user
     */
    public execute = async (user: dawn.Context): Promise<dawn.Context> => {
        user.response = {
            text: [randomResponseToComplimentMessage(user.name.first)]
        };
        return user;
    };
    description: 'Function to compliment user';
}

