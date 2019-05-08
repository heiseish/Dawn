import moment from 'moment-timezone';

const getNingOfTheDay = (): string => {
	const now = parseInt(
		moment()
			.tz('Asia/Singapore')
			.format('H')
	);
	if (now < 12) { return 'morning'; } else if (now < 18) { return 'afternoon'; } else { return 'evening'; }
};

const formatTimeForListTemplate = (time: string): string => {
	return moment(time, 'YYYY-MM-DDTHH:mm:ssZ').format('MMMM Do YYYY');
};

export {
	getNingOfTheDay,
	formatTimeForListTemplate,
};
