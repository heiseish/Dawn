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
* @param {Dawn.userType} user
* @return {news.article} articles
*/
const getAllHeadlines = async (user: Dawn.userType): Promise<news.article[]> => {
	if (!NEWSAPI_KEY) return Promise.reject('missing NEWSAPI_KEY');
	let text:string = user.lastText;
	if (text.includes('"')) {
		text = replaceAllSubstring(text, '"', '“', '”', 'SHOW', 'NEWS', 'WITH', 'ABOUT', 'ON');
		return await getHeadlinesWithQuery(text);
	} 
	const common: string[] = await getCommonMembersFromTwoArrays<string>(Object.keys(MAP_TOPIC_TO_CATEGORY), 
	text[text.length - 1].split(' '));
	const category: (string | null) = MAP_TOPIC_TO_CATEGORY[common[0]] || null;
	if (category) { 
		return await getHeadlinesWithCategory(category);
	} 
	return await getRandomTop5Headlines();
};

/**
* Get a random headline and return the title along with the message
*/
const getRandomHeadlines = async (): Promise<string> => {
	if (!NEWSAPI_KEY) throw new Error('missing NEWSAPI_KEY');
	try {
		let res:news.responseObject = await newsapi.v2
		.topHeadlines({
			sources: 'techcrunch',
			language: 'en',
		})
		const article:news.article = res.articles[Math.floor(Math.random() * res.articles.length)];
		return `Random news: ${article.title}`
	} catch(e) {
		return Promise.reject(e);
	}
};

/**
* Search for articles containing key words
* @param {string} keyword
*/
const getHeadlinesWithQuery = async (keyword: string): Promise<news.article[]> => {
	if (!NEWSAPI_KEY) throw new Error('missing NEWSAPI_KEY');
	try {
		let res:news.responseObject = await newsapi.v2.topHeadlines({
			sources: GOOD_SOURCES,
			q: keyword,
			language: 'en',
		});
		return res.articles;
	} catch(e) {
		return Promise.reject(e);
	}
};

/**
* Search for articles in this category
* @param {string | null} category
*/
const getHeadlinesWithCategory = async (category: string | null): Promise<news.article[]> => {
	if (!NEWSAPI_KEY) throw new Error('missing NEWSAPI_KEY');
	try {
		let res:news.responseObject = await newsapi.v2.topHeadlines({
			category,
			language: 'en',
			country: 'us',
		});
		return res.articles;
	} catch(e) {
		return Promise.reject(e);
	}
};

/**
* Get random top headlines articles
*/
const getRandomTop5Headlines = async (): Promise<news.article[]> => {
	if (!NEWSAPI_KEY) throw new Error('missing NEWSAPI_KEY');
	try {
		let res:news.responseObject = await newsapi.v2.topHeadlines({
			sources: GOOD_SOURCES,
			language: 'en',
		});
		return res.articles;
	} catch(e) {
		return Promise.reject(e);
	}
	
};

export {
	getRandomHeadlines,
	getAllHeadlines,
	getHeadlinesWithQuery,
	getHeadlinesWithCategory,
	getRandomTop5Headlines,
};
