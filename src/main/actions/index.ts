import greet from './greet'
import worldCup from './worldCup'
import news from './news'
import compliment from './compliment'
import thanks from './thanks'
import bye from './bye'
import replyToDocument from './replyToDocument'
import weather from './weather'
import pkmGo from './pkmGo'
import help from './help'
export default [
	{
		name: 'greetings',
		execute: greet,
		description: 'Greet people.',
	},
	{
		name: 'worldCup',
		execute: worldCup,
		description: 'Return World Cup schedule for today!',
	},
	{
		name: 'news',
		execute: news,
		description: 'Show some top news headlines!',
	},
	{
		name: 'compliment',
		execute: compliment,
		description: 'Reply to people paying compliment',
	},
	{
		name: 'bye',
		execute: bye,
		description: 'Reply to people bidding good bye',
	},
	{
		name: 'thanks',
		execute: thanks,
		description: 'Reply to people thanking',
	},
	{
		name: 'replyToDocument',
		execute: replyToDocument,
		description: 'Reply to people sending files',
	},
	{
		name: 'weather',
		execute: weather,
		description: 'Forecast weather',
	},
	{
		name: 'pkmGO',
		execute: pkmGo,
		description: 'Show latest tweets by Pokemon Go on Twitter.',
	},
	{
		name: 'help',
		execute: help,
		description: 'Return help manual for the bot.',
	},
]
