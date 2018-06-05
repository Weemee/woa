import uuid from 'uuid/v4';
import triggers from './triggers';
import upgrades from './upgrades';

export default class Character {
	constructor(Server, character) {
		this.Server = Server;

		this.charID = uuid();

		this.timers = [];

		this.triggers = triggers;

		this.upgrades = upgrades;

		Object.assign(this, {
			...character.dataValues,
		});

		if(this.userID) {
			this.initTimers();
		}
	}

	initTimers() {
		this.Server.timerFacade.addLoop(this);
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
			actions: this.actions,
		};
	}

	setGenerating(resource) {
		console.log('Set generating:', resource);
		this.actions.generating = resource;
	}

	checkUpdates() {
		if(this.actions.generating !== 'slacking') {
			this.generate(this.actions.generating);
		}

		this.checkTriggers();
		//this.stats.firstLogin = true;
		this.stats.status = 'Liza test' + Math.random(1000);
	}

	generate(resource) {
		if(this.resources[resource].owned < this.resources[resource].max)
		{
			this.resources[resource].owned += 10;
		}
	}

	checkTriggers(force = false) {
		for(const item in this.triggers) {
			const trigger = this.triggers[item];
			if(force) {
				if((trigger.bool) && (typeof trigger.once === 'undefined')) {
					this.unlockUpgrade(trigger.exec);
				}
				continue;
			}
			
			if(!trigger.bool && this.triggerMet(this.triggers[item].trigger)) {
				this.unlockUpgrade(trigger.exec);
				trigger.bool = !trigger.bool;
				console.log('Unlocked:', item);
			}
		}
	}

	triggerMet(obj) {
		console.log(obj.resources);
		if(obj.resources) {
			for(const res in obj.resources) {
				console.log(obj.resources[res]);
				if(this.resources[res].owned < obj.resources[res]) {
					console.log('Not enough generated!');
					return false;
				} else {
					console.log('You have enough', res);
				}
			}
		}
		return true;
	}

	unlockUpgrade(unlock) {
		let upgrade = this.upgrades[unlock];

		for(const item in this.upgrades) {
			upgrade = this.upgrades[item];
			if(upgrade.allowed - upgrade.done >= 1) {
				upgrade.locked = false;
			}
			if(upgrade.locked) {
				continue;
			}

			upgrade.locked = false;
		}
	}

	firstLogin(stats, levels, location, resources, research, talents, unlocks) {
		//this.stats = this.stripFetched(stats);

		//this.levels = this.stripFetched(levels);

		//this.location = this.stripFetched(location);

		//this.resources = this.stripFetched(resources);

		//this.research = this.stripFetched(research);

		//this.talents = this.stripFetched(talents);

		//this.unlocks = this.stripFetched(unlocks);

		this.stats.firstLogin = false;
	}

	getSessionID() {
		return `${this.charID}`;
	}
}
