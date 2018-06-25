import uuid from 'uuid/v4';
import Triggers from './triggers';

export default class Character {
	constructor(Server, character) {
		this.Server = Server;

		this.charID = uuid();

		this.timers = [];

		//Move to internal
		this.paused = true;

		this.triggers = null;

		this.availableBuildings = {};

		this.internalActions = {
			removingBuilding: false,
		};

		Object.assign(this, {
			...character.dataValues,
		});
	}

	getDifficulty(diff) {
		switch(diff) {
			case 0:
				console.log('tutorial');
				return 'tutorial';
			case 1:
				console.log('veryeasy');
				return 'veryeasy';
			case 2:
				console.log('easy');
				return 'easy';
			case 3:
				console.log('moderate');
				return 'moderate';
			case 4:
				console.log('prettyhard');
				return 'prettyhard';
			case 5:
				console.log('kappa');
				return 'kappa';
		}
	}

	initCharacter() {
		if(!this.triggers) {
			this.triggers = Triggers[this.getDifficulty(this.difficulty)];
		}

		this.Server.buildingFacade.loadList(this.getDifficulty(this.difficulty));
		this.Server.researchFacade.loadList(this.getDifficulty(this.difficulty));

		for(const item in this.stripFetched(this.unlockedBuildings)) {
			const state = this.stripFetched(this.unlockedBuildings)[item];
			if(state) {
				this.availableBuildings[item] =  this.Server.buildingFacade.getBuilding(item);
			}
		}

		this.timers.push({
			ID: 'gbc',
			timer: setInterval(this.Server.timerFacade.garbageCollection, 100, this),
		});

		if(this.actions.buildingQueue) {
			console.log('There are buildings in the queue, add timers');
			this.actions.buildingQueue.forEach((timer, index) => {
				console.log('\n');
				console.log('Building:', timer.ID);
				console.log('Index:', index);
				console.log('Steps:', timer.steps);

				const building = {
					ID: timer.ID,
					time: timer.time,
					steps: timer.steps,
				};
				this.Server.timerFacade.addTimer(this, building);
			});
		}

		if(this.actions.current.status === 'building') {
			this.build();
		}

		if(this.resources['hydrogen'].max !== (100 * Math.pow(2, this.buildings.storage.owned) / 2).toExponential(2) || this.resources['hydrogen'].max !== (100 * Math.pow(2, this.buildings.storage.owned)) / 2) {
			console.log('\nMax (', (100 * Math.pow(2, this.buildings.storage.owned) / 2).toExponential(2), ') resources (',this.resources['hydrogen'].max, ') are not accurate, fixing...');
			for(const res in this.stripFetched(this.resources)) {
				this.updateMaxStorage(res);
			}
		}
	}

	unmountCharacter() {
		this.timers.forEach((timer, index) => {
			if(timer.ID) {
				try {
					clearInterval(timer.timer);
				} catch(err) {
	
				}
			} else {
				try {
					if(this.actions.buildingQueue[index - 1].steps !== (this.timers[index].steps)) {
						this.actions.buildingQueue[index - 1].steps = (this.actions.buildingQueue[index - 1].time * 10) - (this.timers[index].steps);
					}
					clearInterval(timer.timer);
				} catch(err) {
					console.log(err);
				}
			}
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
			difficulty: this.difficulty,
			stats: this.stripFetched(this.stats),
			levels: this.stripFetched(this.levels),
			location: this.stripFetched(this.location),
			research: this.stripFetched(this.research),
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

	setActionStatus(status, source) {
		console.log('\nStatus:', status, '& source:', source);

		this.actions.current = {
			status: status,
			source: source,
		};
	}

	checkUpdates() {
		if(this.actions.current.status !== null) {
			if(this.actions.current.status === 'gathering') {
				this.generate(this.actions.current.source);
			}

			if(this.actions.current.status === 'building') {
				this.build();
			} else {
				if(this.actions.buildingQueue.length !== 0) {
					this.timers[1].paused = true;
				}
			}
		}

		this.checkTriggers();
		if(!this.internalActions.removingBuilding) {
			this.checkBuildings(this.actions.buildingQueue);
		}
		this.checkResearch();
	}

	generate(resource) {
		const res = this.resources[resource];

		if(res.owned < res.max)
		{
			let newOwned = res.owned + 1.00 * this.getModifier('gathering');
			console.log(Number((newOwned).toFixed(2)));
			if(newOwned >= res.max) {
				res.owned = res.max;
			} else {
				res.owned = Number((newOwned).toFixed(2));
			}
		}
	}

	build() {
		if(this.actions.buildingQueue.length === 0) {
			return;
		}

		if(!this.timers[1].started) {
			this.timers[1].start();
			console.log('Started new timer');
			return;
		}

		if(this.timers[1].paused) {
			this.timers[1].paused = false;
		}
	}

	pauseResume() {
		this.paused = !this.paused;
		return this.paused;
	}

	checkBuildings(queue) {
		if(this.internalActions.removingBuilding) {
			return;
		}
		
		if(this.checkLastBuilding(queue)) {
			return;
		} else {
			if(this.actions.current.status === 'building') {
				queue[0].steps = (queue[0].time * 10) - this.timers[1].steps;
			}
		}
	}

	checkLastBuilding(queue) {
		if(queue.length === 0) {
			return true;
		} else {
			return false;
		}
	}

	addToBuildingsQueue(objID) {
		if(!objID) {
			return {
				error: true,
				message: 'Could not find ', objID,
			};
		}
		console.log(objID);
		const building = this.Server.buildingFacade.getBuilding(objID);

		//Check resources
		let costs;
		if(!building.stats.cost) {
			console.log('Does not cost anything, it is a multiplier or expo function');
			costs = {
				div: building.stats.divider,
				mult: building.stats.multiplier,
			};

			let storageInTheMaking = 0;
			if(this.actions.buildingQueue.length) {
				this.actions.buildingQueue.forEach((building, index) => {
					if(building.ID === 'storage') {
						storageInTheMaking++;
					}
				});
			}
			let check;

			if(storageInTheMaking > 0) {
				console.log('\nWe are building storages, increase cost');
				if((100 * Math.pow(2, this.buildings.storage.owned) / 2).toString().length <= 4) {
					check = ((100 * Math.pow(2, this.buildings.storage.owned + storageInTheMaking)) / 2) / costs.div;
					console.log('Check inside <= 4', check);
				} else {
					check = ((100 * Math.pow(2, this.buildings.storage.owned + storageInTheMaking) / 2) / costs.div).toExponential(2);
					console.log('Check inside +e', check);
				}
			} else {
				check = this.resources['hydrogen'].max / costs.div;
				console.log('Default check', check);
			}

			for(const unEle in this.unlockedElements.dataValues) {
				if(this.unlockedElements.dataValues[unEle]) {
					console.log(unEle + ':', this.unlockedElements.dataValues[unEle]);
					if(this.resources[unEle].owned < check) {
						console.log('\nNot enough', unEle);
						return;
					}
				}
			}

			for(const unEle in this.unlockedElements.dataValues) {
				if(this.unlockedElements.dataValues[unEle]) {
					this.resources[unEle].owned -= check;
				}
			}

		} else {
			console.log('The cost is ', building.stats.cost);
			costs = building.stats.cost;
			let purchase = true;

			for(const res in costs) {
				if(this.resources[res].owned < costs[res]) {
					console.log('False:', res);
					purchase = false;
				} else {
					console.log('True:', res);
				}
			}

			if(!purchase) {
				return false;
			}

			for(const res in costs) {
				this.resources[res].owned -= costs[res];
			}

			if(building.stats.unique) {
				//this.buildings.owned[objID].progress = true;
				this.buildings[objID].progress = true;
			}
		}

		//Make object
		const bObj = {
			ID: objID,
			time: building.stats.time,
			steps: 0,
		};

		//Add object timer
		this.Server.timerFacade.addTimer(this, bObj);
		//Add to building queue
		this.actions.buildingQueue.push(bObj);
	}

	removeFromBuildingsQueue(objID = null) {
		this.internalActions.removingBuilding = true;
		if(typeof(objID) === 'string') {
			objID = parseInt(objID);
		}

		const q = this.actions.buildingQueue;
		
		if(objID !== null) {
			const bID = this.Server.buildingFacade.getBuilding(this.actions.buildingQueue[objID].ID);
			if(bID.stats.unique) {
				this.buildings[this.actions.buildingQueue[objID].ID].progress = false;
			}
			
			this.timers[objID + 1].paused = true;
			this.timers[objID + 1].steps = 0;

			clearInterval(this.timers[objID + 1].timer);
			q.splice(objID, 1);
			this.timers.splice(objID + 1, 1);

			this.build();
		} else {
			const firstBuilding = this.getQueueBuildingFromQueueIndex(0);
			console.log(firstBuilding);
			this.addToBuildingsOwned(this.Server.buildingFacade.getBuilding(firstBuilding.ID), firstBuilding);
			q.shift();
			
			if(!this.checkLastBuilding(q)) {
				if(this.actions.current.status === 'building') {

				}
			}
		}
		
		this.internalActions.removingBuilding = false;
	}

	addToResearchQueue(objID) {
		console.log(this.Server.researchFacade.getList());
	}

	removeFromResearchQueue(objID = null) {
		
	}

	addToBuildingsOwned(buildingID, objID) {
		if(buildingID.stats.unique) {
			this.buildings[objID.ID].complete = true;
		} else {
			this.buildings[objID.ID].owned += 1;
			if(objID.ID === 'storage') {
				for(const res in this.stripFetched(this.resources)) {
					this.updateMaxStorage(res);
				}
				console.log('Storage upgraded');
			}
			console.log(this.buildings[objID.ID].owned);
		}
	}

	updateMaxStorage(resource) {
		if((100 * Math.pow(2, this.buildings.storage.owned) / 2).toString().length <= 4) {
			this.resources[resource].max = (100 * Math.pow(2, this.buildings.storage.owned)) / 2;
		} else {
			this.resources[resource].max = (100 * Math.pow(2, this.buildings.storage.owned) / 2).toExponential(2);
		}
	}

	getQueueBuildingFromQueueIndex(index) {
		return this.actions.buildingQueue[index];
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
