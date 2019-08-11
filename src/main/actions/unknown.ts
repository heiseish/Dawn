import { converse } from '../3rdparty/@facebook/pytorch';
export default class Unknown implements dawn.Action {
    public name = 'unknown';
    /**
     * Reply to good bye message
     * @param {dawn.Context} user
     * @return updated user
     */
    public execute = async (user: dawn.Context): Promise<dawn.Context> => {
        user.response = {
            text: [await converse(user.name.first)],
        };
        return user;
    };
    description: 'Converse';
}
