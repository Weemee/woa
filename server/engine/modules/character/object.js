import uuid from 'uuid/v4';

export default class Character {
	constructor(Server, character) {
		this.Server = Server;

		this.charID = uuid();

		this.stats = {
			currency: '€',
			cash: 300,
			xp: 1337,
		};

		Object.assign(this, {
			...character.dataValues,
			stats: {
				...this.stats,
				...character.dataValues.stats,
			},
		});
	}

	exportToClient() {
		return {
			userID: this.userID,
			name: this.name,
			stats: this.stats,
		};
	}

	getSessionID() {
		return `${this.charID}`;
	}
}
