import uuid from 'uuid/v4';

export default class Character {
	constructor(Server, character) {
		this.Server = Server;

		this.charID = uuid();

		console.log(character);
		//this.stats = character.dataValues.stats.dataValues;
		this.levels = {};
		this.location = {};
		this.resources = {};
		this.research = {};
		this.talents = {};
		this.unlocks = {};
		/*
		Object.assign(this, {
			...character,
			levels: {
				...this.stripFetched(levels),
			},
			...this.stripFetched(location),
			...this.stripFetched(resources),
			...this.stripFetched(research),
			...this.stripFetched(talents),
			...this.stripFetched(unlocks),
		});
		*/

		Object.assign(this, {
			...character.dataValues,
		});
	}

	stripFetched(object) {
		if(!object) {
			return {};
		}
		
		delete object.dataValues['id'];
		delete object.dataValues['charID'];
		delete object.dataValues['createdAt'];
		delete object.dataValues['updatedAt'];

		return object.dataValues;
	}

	exportToClient() {
		return {
			userID: this.userID,
			name: this.name,
			spec: this.spec,
			//Error is here
			stats: this.stats,
		};
	}

	firstLogin(levels, location, resources, research, talents, unlocks) {
		this.levels = this.stripFetched(levels);

		this.location = this.stripFetched(location);

		this.resources = this.stripFetched(resources);

		this.research = this.stripFetched(research);

		this.talents = this.stripFetched(talents);

		this.unlocks = this.stripFetched(unlocks);
	}

	getSessionID() {
		return `${this.charID}`;
	}
}
