import chalk from 'chalk';
import ActionInterface from './actions/index';
import Logger from './logger';

const executer = new ActionInterface();
/**
* Execute action
* @param {dawn.Context} payload
* @return updated user
*/
export default async (ctx: dawn.Context): Promise<dawn.Context> => {
	const log = Logger.info('Executing', true);
	try {
		ctx = await executer.execute(ctx.entity, ctx);
		log.stop('Executed with intent: ' + chalk.blue(ctx.entity) + '.');
		return ctx;
	} catch (e) {
		return Promise.reject(e);
	} finally {
        log.stop('Executed');
    }

};