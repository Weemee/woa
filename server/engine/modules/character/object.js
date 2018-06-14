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
		//this.Server.timerFacade.addLoop(this);
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
		this.checkBuildings();
		this.checkResearch();
	}

	generate(resource) {
		if(this.resources[resource].owned < this.resources[resource].max)
		{
			this.resources[resource].owned += 1;
		}
	}

	pauseResume() {
		this.paused = !this.paused;
		return this.paused;
	}

	checkBuildings() {
		console.log(this.actions.buildingQueue);
		this.checkLastBuilding();
	}

	checkLastBuilding() {

	}

	addToBuildingsQueue(buildingObj) {

	}

	removeFromBuildingsQueue(buildingObj) {

	}

	getQueueIndexFromBuildings(buildingID) {

	}

	checkResearch() {
		console.log(this.actions.researching);
	}

	checkTriggers(force = false) {
		for(const cat in triggers) {
			for(const item in triggers[cat]) {
				const trigger = triggers[cat][item];
				if(force) {
					if((trigger.bool) && (typeof trigger.once === 'undefined')) {
						this.unlockedFeature(item);
					}
					continue;
				}

				if(!trigger.bool && this.triggerMet(trigger.trigger) && !this.alreadyUnlocked(cat, item)) {
					this.unlockedFeature(cat, item);
					trigger.bool = !trigger.bool;
					console.log('Unlocked:', item, '', trigger.bool);
				}
			}
		}
	}

	triggerMet(obj) {
		if(obj.resources) {
			for(const res in obj.resources) {
				if(this.resources[res].owned < obj.resources[res]) {
					return false;
				}
			}
		}
		return true;
	}

	canAfford() {

	}

	alreadyUnlocked(cat, item) {
		return this['unlocked' + cat.charAt(0).toUpperCase() + cat.slice(1)][item]
	}

	unlockedFeature(cat, item) {
		this['unlocked' + cat.charAt(0).toUpperCase() + cat.slice(1)][item] = true;
	}

	firstLogin() {
		this.stats.firstLogin = false;
	}

	getSessionID() {
		return `${this.charID}`;
	}
}
