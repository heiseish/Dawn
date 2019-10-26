declare namespace dawn {

	declare interface Cache {
		flush: () => void;
		close: () => void;
		getUser: (user: dawn.Context) => Promise<dawn.Context>;
		saveUser: (id: string, user: any) => Promise<void>;
	}
}
