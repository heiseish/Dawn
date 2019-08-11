import Analyze from './analyze';
import Execute from './execute';
import GetUser from './getUser';
import Logger from './logger';
import Respond from './respond';
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
			let user = await GetUser(ctx, this.cache);
			user = await Analyze(ctx);
			user = await Execute(ctx);
			await Respond(ctx);
			this.cache.saveUser(user.id, user);
		} catch (err) {
			Logger.error(err);
		} finally {
			Logger.separator();
		}
    }
}
