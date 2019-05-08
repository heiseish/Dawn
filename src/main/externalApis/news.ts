import NewsAPI from 'newsapi';
import { NEWSAPI_KEY } from '../environment';
const newsapi = new NewsAPI(NEWSAPI_KEY);
import { getCommonMembersFromTwoArrays } from '../utils/array';
import { replaceAllSubstring } from '../utils/string';
const GOOD_SOURCES = 'bbc-news,the-verge,bbc-sport,bloomberg,business-insider,business-insider-uk,cnn,espn,google-news,mtv-news,the-economist,the-new-york-times,the-washington-post';
const MAP_TOPIC_TO_CATEGORY = {
	sport: 'sports',
	health: 'health',
	business: 'business',
	entertain: 'entertainment',
	general: 'general',
	technolog: 'technology',
	scienc: 'science',
};

/**
 * Get top headlines
 * @param {any} user
 */
const getAllHeadlines = (user: any): Promise<any[]> => {
	if (!NEWSAPI_KEY) return Promise.reject('missing NEWSAPI_KEY');
	let text = user.lastText;
	if (text.indexOf('"') !== -1) {
		text = replaceAllSubstring(text, '"', '“', '”', 'SHOW', 'NEWS', 'WITH', 'ABOUT', 'ON');
		return new Promise((resolve) => getHeadlinesWithQuery(text).then((articles) => resolve(articles)));
	} else {
		const common: string[] = getCommonMembersFromTwoArrays(Object.keys(MAP_TOPIC_TO_CATEGORY), user.text[user.text.length - 1].tokenizedText);
		const category: (string | null) = MAP_TOPIC_TO_CATEGORY[common[0]] || null;
		if (category) { return new Promise((resolve) => getHeadlinesWithCategory(category)
			.then((articles) => resolve(articles)));
		} else { return new Promise((resolve) => getRandomTop5Headlines()
			.then((articles) => resolve(articles)));
		}
	}
};

/**
 * Get a random headline and return the title along with the message
 */
const getRandomHeadlines = (): Promise<any> => {
	if (!NEWSAPI_KEY) return Promise.reject('missing NEWSAPI_KEY');
	return new Promise((resolve) => {
		newsapi.v2
			.topHeadlines({
				sources: 'techcrunch',
				language: 'en',
			})
			.then((response) => {
				const article = response.articles[Math.floor(Math.random() * response.articles.length)];
				resolve({
					answerable: true,
					simpleText: `Random news: ${article.title}`,
					image: article.urlToImage,
					url: article.url,
				});
			});
	});
};

/**
 * Search for articles containing key words
 * @param {string} keyword
 */
const getHeadlinesWithQuery = (keyword: string): Promise<any[]> => {
	if (!NEWSAPI_KEY) return Promise.reject('missing NEWSAPI_KEY');
	return new Promise((res) => {
		newsapi.v2
			.topHeadlines({
				sources: GOOD_SOURCES,
				q: keyword,
				language: 'en',
			})
			.then((response) => res(response.articles));
	});
};

/**
 * Search for articles in this category
 * @param {string | null} category
 */
const getHeadlinesWithCategory = (category: string | null): Promise<any[]> => {
	if (!NEWSAPI_KEY) return Promise.reject('missing NEWSAPI_KEY');
	return new Promise((res) => {
		newsapi.v2
			.topHeadlines({
				category,
				language: 'en',
				country: 'us',
			})
			.then((response) => res(response.articles));
	});
};

/**
 * Get random top headlines articles
 */
const getRandomTop5Headlines = (): Promise<any[]> => {
	if (!NEWSAPI_KEY) return Promise.reject('missing NEWSAPI_KEY');
	return new Promise((res) => {
		newsapi.v2
			.topHeadlines({
				sources: GOOD_SOURCES,
				language: 'en',
			})
			.then((response) => res(response.articles));
	});
};

export {
	getRandomHeadlines,
	getAllHeadlines,
	getHeadlinesWithQuery,
	getHeadlinesWithCategory,
	getRandomTop5Headlines,
};
