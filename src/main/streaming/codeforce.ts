import schedule from 'node-schedule';
import { getUserRating } from '../externalApis/codeforce';
import Logger from '../logger';
import stream from './';

export default class CodeforceStream {
	private scheduler;
	private firebase;
	/**
	 * @param handle Create a codeforce stream with a user
	 */
	constructor(firebase: any) {
		this.firebase = firebase;
	}
	/**
	 * Schedule a job @8.30 am every day to send daily nasa picture
	 * @param list list of person to send message to
	 */
	startStreaming(list: string[]) {
		this.scheduler = schedule.scheduleJob('*/20 * * * *', async () => {
			const users: CodeforceUser[] = await this.firebase.getCodeforceHandle();
			for (const user of Object.values(users)) {
				const info: CodeforceRanking = await getUserRating(user.handle);
				if (!user.standing || info.rating != user.standing.rating) {
					await this.firebase.setCurrentCodeforceStanding(user.handle, info);
					stream({
						text: 'Codeforce user ' + user.handle + ':\nNew codeforce rating: ' + info.rating + '\nNew rank: ' + info.rank,
					}, list);
				}
			}

		});
	}

	stopStreaming = () => {
		Logger.warn('Terminating codeforce streaming job');
		this.scheduler.cancel();
	}

}
