declare namespace Mongoose {

declare interface UserDatabase {
    updateUser: (id: string, user: dawn.Context) => Promise<dawn.Context | null> ;
    findUser:(id: string) => Promise<null | dawn.Context>;
    addUser:(ctx: dawn.Context) => Promise<dawn.Context>;
    findOrCreateUser: (ctx: dawn.Context) => Promise<dawn.Context>;
}
}