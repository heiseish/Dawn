import schedule from 'node-schedule';
import { getUserRating } from '../externalApis/codeforce';
import Logger from '../logger';
import stream from './';

export default class CodeforceStream implements Dawn.Streamer{
	private scheduler;
	private firebase;
	/**
	 * @param handle Create a codeforce stream with a user
	 */
	constructor(firebase: any) {
		this.firebase = firebase;
	}
	/**
	 * Schedule 20-min interval check for codeforce ranking change
	 * @param list list of person to send message to
	 * @returns void
	 */
	public startStreaming(list: string[]): void {
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

	/**
	 * Terminal codeforce streaming job
	 * @returns void
	 */
	public stopStreaming(): void {
		Logger.warn('Terminating codeforce streaming job');
		this.scheduler.cancel();
	}

}
