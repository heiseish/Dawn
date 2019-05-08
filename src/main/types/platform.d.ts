declare type supportedPlatform = 'messenger' | 'telegram';

declare interface MessengerTextMedia {
	type: 'image' | 'video';
	url?: string;
	id?: string | number | null;
}
declare type MessengerTextButton = {
	title?: string,
	url?: string,
} | null;
