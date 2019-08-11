import graph from 'fbgraph';
import { FB_PAGE_TOKEN } from '../../environment';

graph.setAccessToken(FB_PAGE_TOKEN);
graph.setVersion('2.6');

/**
 * Get the user first and last name
 * @param sender user id
 * @return promise contains the user name
 */
const getUserName = (sender: string): Promise<{first: string, last: string} | null> => {
	return new Promise((response) => {
		graph.get(sender, (err, res) => {
			if (err) { response(null); } else {
				response({
					first: res.first_name,
					last: res.last_name,
				});
			}
		});
	});
};

export {
	getUserName,
};
