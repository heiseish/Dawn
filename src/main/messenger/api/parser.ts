import Logger from '../../logger'
import idx from 'idx'
import { formatTimeForListTemplate } from '../../externalApis/moment'

/**
 * Parse News API articles to display on facebook messenger list template.
 * @param items Array of items to be parsed.
 */
const parseArticles = (items: any[]): any[]  => {
	let elements = [], i = 0
	if (items.length > 4) { Logger.error('Trying to send list template message with more than 4 articles') }
	for (const item of items) {
		elements[i] = {}
		elements[i].title  = item.title
		elements[i].subtitle =
		`${idx(item, (_) => _.source.name)}\n${formatTimeForListTemplate(item.publishedAt)}`
		elements[i].image_url = item.urlToImage
		elements[i].buttons = [{
			title: 'View',
			type: 'web_url',
			url: item.url,
			webview_height_ratio: 'tall',
		}]
		i++
	}
	return elements
}

export {
	parseArticles,
}
