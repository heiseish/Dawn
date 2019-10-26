const MANUAL_LINK = 'https://gist.github.com/MadaraUCH/522028088e49110b4511d4cabea361f9';

export default class Help implements dawn.Action {
    public name = 'help';
    /**
     * Reply to good bye message
     * @param {dawn.Context} user
     * @return updated user
     */
    public execute = async (user: dawn.Context): Promise<dawn.Context> => {
        user.response =  {
            text: ['You may find the help manual here: ' + MANUAL_LINK],
        };
        return user;
    };
    description: 'Function to send help manuel';
}

