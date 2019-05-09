import Gists from 'gists';
import { GIT_ID, GIT_PW } from '../environment';

const gists: Gists = new Gists({
	username: GIT_ID,
	password: GIT_PW,
});

/**
 * Edit gist
 * @param opts options
 */
const editGist = (opts: {}): Promise<string> => {
	return new Promise((resolve, reject) => {
		gists.edit(opts, (err, res) =>  {
			if (err) {
				reject(err);
			} else {
				resolve(res);
			}
		});
	});
};

/**
 * Create gist
 * @param opts options
 */
const createGist = (opts: {}): Promise<string> => {
	return new Promise((resolve, reject) => {
		gists.create(opts, (err, res) =>  {
			if (err) {
				reject(err);
			} else {
				resolve(res);
			}
		});
	});
};

export {
	editGist,
	createGist,
};
