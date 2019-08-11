import schedule from 'node-schedule';
import getDailyNasaNews from '../3rdparty/@nasa';
import Logger from '../logger';
import stream from './';

export default class MorningNasa implements dawn.Streamer {
	private scheduler;

	/**
	 * Schedule a job @8.30 am every day to send daily nasa picture
	 * @param list list of person to send message to
	 */
	startStreaming(list: dawn.StreamPerson[]) {
		this.scheduler = schedule.scheduleJob('30 08 * * *', async () => {
			const nasa = await getDailyNasaNews();
			stream({
				text: nasa.explanation,
				image: nasa.url,
			}, list);
		});
	}

	stopStreaming = () => {
		Logger.warn('Terminating morning NASA job');
		this.scheduler.cancel();
	}

}
