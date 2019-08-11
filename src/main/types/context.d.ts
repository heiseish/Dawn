namespace dawn {

declare type SupportedPlatform = 'messenger' | 'telegram';

declare interface Context {
    id: string,
    chat?: { // telegram message id
        message_id?: number, 
        chat_id?:number,
    },
    platform: SupportedPlatform,
    name: {
        first?: string,
        last?: string,
    },
    location?: {
        lat?: number | string,
        long?: number | string,
        formattedAddress?: string,
    },
    text?: string,
    document?: {
        type?: 'image' | 'video' | 'location' | 'QUICK_REPLY' | 'audio',
        value?: number | string,
    },
    entity?: string,
    response?: {
        text?: string[],
        image?: string[],
        url?: string[]
    },
    locale?: string
}

}