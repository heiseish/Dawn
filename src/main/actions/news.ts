import { getAllHeadlines } from '../3rdparty/news';
import { shuffle } from '../utils/array';

export default class News implements dawn.Action {
    public name = 'news';
    /**
     * Reply to good bye message
     * @param {dawn.Context} user
     * @return updated user
     */
    public execute = async (user: dawn.Context): Promise<dawn.Context> => {
        try {
            const articles:news.article[] = shuffle<news.article>(await getAllHeadlines(user)).slice(0, 4);
            user.response = {
                text: [],
                image: [],
                url: []
            }
            for (let art of articles) {
                if (art.title) user.response.text.push(art.title);
                if (art.urlToImage) user.response.image.push(art.urlToImage);
                if (art.url) user.response.url.push(art.url);
            }
            return user;
        } catch (e) {
            return Promise.reject(e);
        }
    };
    description: 'Function to retrieve and display some news';
}
