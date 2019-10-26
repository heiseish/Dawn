import { randomByeMessage } from '../lib/string';
export default class Bye implements dawn.Action {
    name = 'bye';
    /**
     * Reply to good bye message
     * @param {dawn.Context} user
     * @return updated user
     */
    execute = async (user: dawn.Context): Promise<dawn.Context> => {
        user.response = {
            text: [randomByeMessage(user.name.first)],
        };
        return user;
    };
    description: 'Function to reply message';
}
