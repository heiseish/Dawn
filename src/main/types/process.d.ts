namespace dawn {
    declare type Preprocess =  {
        [key: string]: (msg: Facebook.Message | TelegramBot.Message) => dawn.Context
    };
    declare type RespondProcess =  {
        [key: string]: (msg: dawn.Context) => Promise<void>
    };
}
