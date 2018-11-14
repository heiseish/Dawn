import Logger from '../logger'
import idx from 'idx'
import { formatTimeForListTemplate } from '../externalApis/moment'

/**
 * Parse articles to become viewable formats
 * @param items articles
 * @return parsed article
 */
const parseArticles = (items: any[]): cascadeTextType  => {
	let elements = [], i = 0
	if (items.length > 4) Logger.error('Trying to send list template message with more than 4 particles')
	for (const item of items) {
		elements[i] = {}
		elements[i].title  = item.title
		elements[i].subtitle =
		`${idx(item, (_) => _.source.name)}\n${formatTimeForListTemplate(item.publishedAt)}`
		elements[i].image_url = item.urlToImage
		elements[i].buttons = [
			{
				title: 'View',
				type: 'web_url',
				url: item.url,
				webview_height_ratio: 'tall',
			},
		]
		i++
	}
	return elements
}

export {
	parseArticles,
}
