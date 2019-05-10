import _ from 'lodash/core';
import { getAllHeadlines } from '../externalApis/news';
import { shuffle } from '../utils/array';
import { parseArticles } from './utils';
const NO_ARTICLE_FOUND = 'Sorry no article found :<';

/**
 * Send news to user
 * @param {Dawn.userType} user
 * @returns updated user
 */
export default async (user: Dawn.userType): Promise<Dawn.userType> => {
	try {
		const articles:news.article[] = shuffle<news.article>(await getAllHeadlines(user)).slice(0, 4);
		if (!_.isEmpty(articles)) {
			const parsedArticles = parseArticles(articles);
			user.response = {
				cascadeText: parsedArticles,
				answerable: true,
			};
		} else {
			user.response = {
				answerable: true,
				simpleText: NO_ARTICLE_FOUND,
			};
		}
		return user;
	} catch (e) {
		return Promise.reject(e);
	}
};
