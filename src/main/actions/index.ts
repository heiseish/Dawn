import fs from 'fs';
import Bye from './bye';
import Compliment from './compliment';
import Greet from './greet';
import Help from './help';
import News from './news';
import PokemonGo from './pkmGo';
import Document from './sendDocument';
import Unknown from './unknown';
import Weather from './weather';
import WorldCup from './worldCup';

interface MiniHashTable {
    [key: string]: Function;
}
export default class ActionInterface {
    private map: MiniHashTable;
    private lst: dawn.Action[];
    constructor() {
        this.map = {}
        this.lst = []
        this.lst.push(new Bye());
        this.lst.push(new Compliment());
        this.lst.push(new Greet());
        this.lst.push(new Help());
        this.lst.push(new News());
        this.lst.push(new PokemonGo());
        this.lst.push(new Document());
        this.lst.push(new Unknown());
        this.lst.push(new WorldCup());
        this.lst.push(new Weather());

        for (let item of this.lst) {
            this.map[item.name] = item.execute
        }
    }

    public async execute(intent: string, user?: dawn.Context): Promise<dawn.Context> {
        try {
            console.log(intent);
            let func = this.map[intent];
            if (typeof func !== 'function') {
                return Promise.reject('Fail to load action interface or unhandled intent'); 
            } 
            return await func(user);
        } catch(e) {
            return Promise.reject(e);
        }
         
    }
}

