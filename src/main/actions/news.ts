import _ from 'lodash/core'
import { getAllHeadlines } from '../externalApis/news'
import { shuffle } from '../utils/array'
import { parseArticles } from './utils'
const NO_ARTICLE_FOUND = 'Sorry no article found :<'

/**
 * Send news to user
 * @param {userType} user
 */
export default async (user: userType): Promise<userType | Error> => {
	try {
		const articles = shuffle(await getAllHeadlines(user)).slice(0, 4)
		if (!_.isEmpty(articles)) {
			const parsedArticles = parseArticles(articles)
			user.response = {
				cascadeText: parsedArticles,
				answerable: true,
			}
			return user
		} else {
			user.response = {
				answerable: true,
				simpleText: NO_ARTICLE_FOUND,
			}
			return user
		}

	} catch (e) {
		return Promise.reject(e)
	}
}
