declare interface messengerEntitiesType {
	greetings?: any
	thanks?: any
	bye?: any
	datetime?: any
	amount_of_money?: any
	phone_number?: any
	email?: any
	distance?: any
	quantity?: any
	temperature?: any
	volume?: any
	location?: any
	duration?: any
	url?: any
	sentiment?: any
}

declare interface databaseTextType {
	[n: number]: {
		originalText: string,
		tokenizedText: {
			[n: number]: string,
		},
		timeStamp: number,
	}
}

declare type localTextType = Array<{
	originalText: string,
	tokenizedText: string[],
	timeStamp: number,
}>

declare interface userType {
	id: string
	name?: {
		first?: string,
		last?: string,
		full?: string,
	}
	lastLocation?: {
		lat?: number | string,
		long?: number | string,
		formattedAddress?: string,
	}
	lastDoc?: {
		value?: number | string,
		type?: 'image' | 'video' | 'location' | 'QUICK_REPLY' | 'audio',
	}
	lastText?: string
	text?: Text[]
	entity?: {
		lastIntent?: string,
		sentiment?: string,
	}
	toObject?: () => userType
	response?: {
		answerable?: Boolean,
		simpleText?: string | null,
		image?: string,
		cascadeText?: cascadeTextType,
		multipleText?: string[],
		url?: string,
	}
	locale: string
}

declare type cascadeTextType = Array<{
	title: string,
	image: string,
	image_url: string,
	buttons: cascadeTextButton[],
}>

declare interface cascadeTextButton {
	title: string,
	type: 'web_url',
	url: string,
	webview_height_ratio: 'tall' | 'short',
}
