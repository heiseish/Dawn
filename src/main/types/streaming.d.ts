namespace dawn {
	declare interface Streamer {
		startStreaming: Function;
		stopStreaming: Function;
    }
    
    declare type StreamPerson = {
        id: string,
        platform: string
    }
}
