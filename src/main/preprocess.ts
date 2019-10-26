import messengerPreprocess  from './messenger/preprocess';
import telegramPreprocess from './telegram/preprocess';

const preprocess: dawn.Preprocess = {
    'telegram': telegramPreprocess,
    'messenger': messengerPreprocess
}
export default (platform: dawn.SupportedPlatform) => preprocess[platform];
