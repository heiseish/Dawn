import bye from './bye'
import compliment from './compliment'
import greet from './greet'
import help from './help'
import news from './news'
import pkmGo from './pkmGo'
import sendDocument from './sendDocument'
import thanks from './thanks'
import weather from './weather'
import worldCup from './worldCup'
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
		name: 'sendDocument',
		execute: sendDocument,
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
