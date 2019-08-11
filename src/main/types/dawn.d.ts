declare namespace dawn {



declare interface Action {
    name: string,
    execute: (ctx?: dawn.Context) => Promise<dawn.Context>;
    description: string
}
declare interface App {
    configureExpress: (port: string | number) => void;
    startServer: () => Promise<void>;
    setUpDatabase: () => Promise<void>;
}

declare interface Sweeper {
    add: (fn: Function) => void;
}

}
