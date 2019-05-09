declare namespace Dawn {
	declare interface Action {
		name: string;
		execute: Function;
		description: string;
	}
	declare interface App {
		configureExpress: (port: string | number) => void;
		startServer: () => Promise<void>;
		setUpDatabase: () => Promise<void>;
	}

	declare interface Sweeper {
		add: (fn: Function) => void;
	}

	declare interface Payload {
		sender_id: string;
		text?: string;
		quickReply?: string;
		document?: {
			type: string,
			id: string
		};
	}
}
