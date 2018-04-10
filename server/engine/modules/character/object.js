import uuid from 'uuid/v4';

export default class Character {
	constructor(Server, character) {
		this.Server = Server;

		this.id = uuid();

		Object.assign(this, {
			...character,
		});
	}

	exportToClient() {
		return {
			userID: this.userID,
			name: this.name,
		};
	}
}