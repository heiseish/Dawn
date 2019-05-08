import Gists from 'gists';
import { GIT_ID, GIT_PW } from '../environment';

const gists = new Gists({
	username: GIT_ID,
	password: GIT_PW,
});

const editGist = (opts: any): Promise<any> => {
	return new Promise((resolve, reject) => {
		gists.edit(opts, (err, res) =>  {
			if (err) { reject(err); } else { resolve(res); }
		});
	});
};

const createGist = (opts: Object): Promise<any> => {
	return new Promise((resolve, reject) => {
		gists.create(opts, (err, res) =>  {
			if (err) { reject(err); } else { resolve(res); }
		});
	});
};

export {
	editGist,
	createGist,
};
