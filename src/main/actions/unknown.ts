import { RunInferenceSequence2Sequence } from '../3rdparty/@google/grpc/client';
export default class Unknown implements dawn.Action {
    public name = 'unknown';
    /**
     * Reply to good bye message
     * @param {dawn.Context} user
     * @return updated user
     */
    public execute = async (user: dawn.Context): Promise<dawn.Context> => {
        user.response = {
            text: [await RunInferenceSequence2Sequence(user.text)],
        };
        return user;
    };
    description: 'Converse';
}
