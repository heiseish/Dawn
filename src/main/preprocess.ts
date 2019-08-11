import messengerPreprocess  from './messenger/preprocess';
import telegramPreprocess from './telegram/preprocess';
import TelegramBot from 'node-telegram-bot-api';
type Preprocess =  {
    [key: string]: (msg: Facebook.Message | TelegramBot.Message) => dawn.Context
}

const preprocess: Preprocess = {
    'telegram': telegramPreprocess,
    'messenger': messengerPreprocess
}
export default (platform: dawn.SupportedPlatform) => preprocess[platform];
