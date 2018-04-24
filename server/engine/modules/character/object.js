import uuid from 'uuid/v4';

export default class Character {
	constructor(Server, character) {
		this.Server = Server;

		this.id = character.id;
		this.userID = character.userID;
		this.name = character.name;

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
