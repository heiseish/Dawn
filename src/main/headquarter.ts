import analyze from './analyze';
import execute from './execute';
import getUser from './getUser';
import Logger from './logger';
import respond from './respond';
import Cache from './model/cache';
import Sweeper from './sweeper';

export default class Headquarter {
    private sweeper: Sweeper;
    private cache: Cache;
    setUserDB = (user: Mongoose.UserDatabase):void => {
        this.sweeper = new Sweeper();
        this.cache = new Cache(user);
        this.sweeper.add(this.cache.close);
    }
    /**
     * Process request
     * @param ctx 
     * @param cache 
     */
    async receive(ctx: dawn.Context): Promise<void> {
		Logger.info('Transfering event to headquarter..', false, Headquarter.name);
		try {
			let user = await getUser(ctx, this.cache);
			user = await analyze(ctx);
			user = await execute(ctx);
			await respond(ctx);
			this.cache.saveUser(user.id, user);
		} catch (err) {
			Logger.error(err);
		} finally {
			Logger.separator();
		}
    }
}
