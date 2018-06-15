import uuid from 'uuid/v4';
import Triggers from './triggers';

export default class Character {
	constructor(Server, character) {
		this.Server = Server;

		this.charID = uuid();

		this.timers = [];

		this.paused = true;

		this.triggers = null;

		this.availableBuildings = {};

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

	getDifficulty(diff) {
		switch(diff) {
			case 0:
				return 'tutorial';
			case 1:
				return 'veryeasy';
			case 2:
				return 'easy';
			case 3:
				return 'moderate';
			case 4:
				return 'prettyhard';
			case 5:
				return 'kappa';
		}
	}

	initCharacter() {
		if(!this.triggers) {
			this.triggers = Triggers[this.getDifficulty(this.difficulty)];
		}
		this.Server.buildingFacade.loadList(this.getDifficulty(this.difficulty));
		for(const item in this.stripFetched(this.unlockedBuildings)) {
			const state = this.stripFetched(this.unlockedBuildings)[item];
			if(state) {
				this.availableBuildings[item] =  this.Server.buildingFacade.getBuilding(item);
			}
		}
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
			difficulty: this.difficulty,
			stats: this.stripFetched(this.stats),
			levels: this.stripFetched(this.levels),
			location: this.stripFetched(this.location),
			resources: this.stripFetched(this.resources),
			buildings: {
				owned: this.stripFetched(this.buildings),
				available: this.availableBuildings,
			},
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

	getModifier(mod) {
		if(!mod) {
			return;
		}

		const diff = this.triggers.baseValues.difficulty;

		switch(mod) {
			case 'loopSpeed':
				return diff.loopSpeed;

			case 'gathering':
				return diff.gatheringMult;
		}
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
		const res = this.resources[resource];
		if(res.owned < res.max)
		{
			let newOwned = res.owned + 1.00 * this.getModifier('gathering');
			console.log(Number((newOwned).toFixed(2)));
			if(newOwned >= res.max) {
				res.owned = 100;
			} else {
				res.owned = Number((newOwned).toFixed(2));
			}
		}
	}

	pauseResume() {
		this.paused = !this.paused;
		return this.paused;
	}

	checkBuildings() {
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

	}

	checkTriggers(force = false) {
		for(const cat in this.triggers) {
			if(cat !== 'baseValues') {
				for(const item in this.triggers[cat]) {
					const trigger = this.triggers[cat][item];
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
		return this['unlocked' + cat.charAt(0).toUpperCase() + cat.slice(1)][item];
	}

	unlockedFeature(cat, item) {
		this['unlocked' + cat.charAt(0).toUpperCase() + cat.slice(1)][item] = true;
		if(cat === 'buildings') {
			this.availableBuildings += {[item]: this.Server.buildingFacade.getBuilding(item)};
		}
	}

	firstLogin() {
		this.stats.firstLogin = false;
	}

	getSessionID() {
		return `${this.charID}`;
	}
}
