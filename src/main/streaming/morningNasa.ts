import stream from './'
import schedule from 'node-schedule'
import getDailyNasaNews from '../externalApis/@nasa'
import Logger from '../logger'

export default class MorningNasa {
	private scheduler

	/**
	 * Schedule a job @8.30 am every day to send daily nasa picture
	 * @param list list of person to send message to
	 */
	public startStreaming(list: string[]) {
		this.scheduler = schedule.scheduleJob('30 08 * * *', async () => {
			let nasa = await getDailyNasaNews()
			stream({
				text: nasa.explanation,
				image: nasa.url
			}, list)
		});
	}

	public stopStreaming = () => {
		Logger.warn('Terminating morning NASA job')
		this.scheduler.cancel()
	}

}