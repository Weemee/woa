import uuid from 'uuid/v4';

export default class Character {
	constructor(Server, character) {
		this.Server = Server;

		this.charID = uuid();

		this.timers = [];

		Object.assign(this, {
			...character.dataValues,
		});

		if(this.userID) {
			this.initTimers();
		}
	}

	initTimers() {
		/*this.timers.push({
			name: 'cleanUp',
			timer: setInterval('penis', 1000),
		});*/
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
			stats: this.stats,
			levels: this.levels,
			location: this.location,
			resources: this.resources,
			research: this.research,
			talents: this.talents,
			unlocks: this.unlocks,
		};
	}

	generate() {
		this.resources.hydrogen.owned++;
	}

	firstLogin(stats, levels, location, resources, research, talents, unlocks) {
		this.stats = this.stripFetched(stats);

		this.levels = this.stripFetched(levels);

		this.location = this.stripFetched(location);

		this.resources = this.stripFetched(resources);

		this.research = this.stripFetched(research);

		this.talents = this.stripFetched(talents);

		this.unlocks = this.stripFetched(unlocks);

		this.stats.firstLogin = false;
	}

	getSessionID() {
		return `${this.charID}`;
	}
}
