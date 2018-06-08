import uuid from 'uuid/v4';
import triggers from './triggers';
import unlocks from './unlocks';

export default class Character {
	constructor(Server, character) {
		this.Server = Server;

		this.charID = uuid();

		this.timers = [];

		this.paused = true;

		this.buildings = this.stripFetched(this.unlockedBuildings),
		this.elements = this.stripFetched(this.unlockedElements),
		this.functions = this.stripFetched(this.unlockedFunctions),
		this.research = this.stripFetched(this.unlockedResearch),

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
			stats: this.stripFetched(this.stats),
			levels: this.stripFetched(this.levels),
			location: this.stripFetched(this.location),
			resources: this.stripFetched(this.resources),
			talents: this.stripFetched(this.talents),
			actions: this.stripFetched(this.actions),
			unlocked: {
				buildings: this.stripFetched(this.unlockedBuildings),
				elements: this.stripFetched(this.unlockedElements),
				functions: this.stripFetched(this.unlockedFunctions),
				research: this.stripFetched(this.unlockedResearch),
			},
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
	}

	generate(resource) {
		if(this.resources[resource].owned < this.resources[resource].max)
		{
			this.resources[resource].owned += 10;
		}
	}

	pauseResume() {
		this.paused = !this.paused;
	}

	checkTriggers(force = false) {
		console.log('New: \n');
		for(const cat in triggers) {
			for(const item in triggers[cat]) {
				const trigger = triggers[cat][item];
				if(force) {
					if((trigger.bool) && (typeof trigger.once === 'undefined')) {
						this.unlockedFeature(trigger[item]);
					}
					continue;
				}

				if(!trigger.bool && this.triggerMet(triggers[cat][item].trigger)/* && !this.unlocked['unlocked' + cat.charAt(0).toUpperCase() + cat.slice(1)][item]*/) {
					this.unlockedFeature(trigger[item]);
					trigger.bool = !trigger.bool;
					console.log('Unlocked:', item);
				}
			}
		}
	}

	triggerMet(obj) {
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

	unlockedFeature(unlock) {
		console.log(unlock);
		let unlocked = unlocks[unlock];

		for(const item in unlocks) {
			unlocked = unlocks[item];
			if(unlocked.allowed - unlocked.done >= 1) {
				unlocked.locked = false;
			}
			if(unlocked.locked) {
				continue;
			}

			unlocked.locked = false;
		}
	}

	firstLogin() {
		//this.stats = this.stripFetched(stats);
		this.stats.firstLogin = false;
	}

	getSessionID() {
		return `${this.charID}`;
	}
}
