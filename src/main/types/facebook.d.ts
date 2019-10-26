namespace Facebook {

    declare interface MessengerTextMedia {
        type: 'image' | 'video';
        url?: string;
        id?: string | number;
    }
    declare type MessengerTextButton = {
        title?: string,
        url?: string,
    } | null;
    
    declare interface Attachment {
        type: string,
        payload?: {
            coordinates?: {
                lat: number,
                long: number,
            }
        }
    }
    declare interface Message {
        message?: {
            text?: string,
            attachments?: Attachment[],
            quick_reply?: {
                payload: string
            }
        },
        sender?: {
            id?: string
        }
    }
}