import schedule from 'node-schedule';
import { getUserRating } from '../3rdparty/codeforce';
import Logger from '../logger';
import stream from './';

export default class CodeforceStream implements dawn.Streamer {
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
	startStreaming(list: dawn.StreamPerson[]): void {
        Logger.info('Starting Codeforce streaming');
		this.scheduler = schedule.scheduleJob('*/1 * * * *', async () => {
            const users: CodeforceUser[] = await this.firebase.getCodeforceHandle();
            // console.log(users)
			for (const user of Object.values(users)) {
                // console.log('User handle is ', user.handle);
				const info: CodeforceRanking = await getUserRating(user.handle);
				if (!user.standing || info.rating != user.standing.rating) {
                    await this.firebase.setCurrentCodeforceStanding(user.handle, info);
                    if (info.rating > user.standing.rating) {
                        stream({
                            text: 'Codeforce user ' + user.handle + ':\nNice!, you have improved to new codeforce rating: ' + info.rating + '\nNew rank: ' + info.rank,
                        }, list);
                    } else {
                        stream({
                            text: 'Codeforce user ' + user.handle + ':\nYour codeforce rating drops a bit but dont give up!\nNew codeforce rating: ' + info.rating + '\nNew rank: ' + info.rank,
                        }, list);
                    }
					
				} else if (!user.standing || info.rating < user.standing.rating) {
                }
			}

		});
	}

	/**
	 * Terminal codeforce streaming job
	 * @returns void
	 */
	stopStreaming(): void {
		Logger.warn('Terminating codeforce streaming job');
		this.scheduler.cancel();
	}

}
