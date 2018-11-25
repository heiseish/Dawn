import stream from './'
import schedule from 'node-schedule'
import { getUserRating } from '../externalApis/codeforce'
import Logger from '../logger'

export default class CodeforceStream {
	private scheduler
	private firebase
	/**
	 * 
	 * @param handle Create a codeforce stream with a user
	 */
	constructor(firebase: any) {
		this.firebase = firebase
	}
	/**
	 * Schedule a job @8.30 am every day to send daily nasa picture
	 * @param list list of person to send message to
	 */
	public startStreaming(list: string[]) {
		this.scheduler = schedule.scheduleJob('*/20 * * * *', async () => {
			let handle = await this.firebase.getCodeforceHandle()
			let info: CFRanking = await getUserRating(handle)
			let current: null | CFRanking = await this.firebase.getCurrentCodeforceStanding()
			if (!current || info.rating != current.rating) {
				await this.firebase.setCurrentCodeforceStanding(info)
				stream({
					text: 'New codeforce rating: ' + info.rating + '\nNew rank: ' + info.rank
				}, list)
			}
		});
	}

	public stopStreaming = () => {
		Logger.warn('Terminating codeforce streaming job')
		this.scheduler.cancel()
	}

}