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

		this.timers.push({
			ID: 'gbc',
			timer: setInterval(this.Server.timerFacade.garbageCollection, 100, this),
		});

		if(this.actions.buildingQueue) {
			console.log('There are buildings in the queue, add timers');
			this.actions.buildingQueue.forEach((timer, index) => {
				console.log('\n');
				console.log('Building:', timer);
				console.log('Index:', index);

				const building = {
					ID: timer.ID,
					time: timer.time,
				};
				this.Server.timerFacade.addTimer(this, building);
			});
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
					if(this.actions.buildingQueue[index - 1].time !== (this.timers[index].steps / 10)) {
						this.actions.buildingQueue[index - 1].time = (this.timers[index].steps / 10);
					}
					clearInterval(timer.timer);
				} catch(err) {
	
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
				this.build(this.actions.current.source);
			}
		}

		this.checkTriggers();
		this.checkBuildings(this.actions.buildingQueue);
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

	build() {
		this.timers[1].start();
	}

	pauseResume() {
		this.paused = !this.paused;
		return this.paused;
	}

	checkBuildings(queue) {
		if(this.checkLastBuilding(queue)) {
			//console.log('No more buildings');
			//this.addToBuildingsQueue('storage');
			//this.addToBuildingsQueue('researchlab');
			return;
		} else {
			//console.log('There are some buildings, lets check what...');
			//This is where we start the timer to build, check resources, return resources etc.
			this.build();
			for(let index in queue) {
				//console.log('\nBuilding:', queue[index]);
				//console.log('Now we remove it');
				//this.removeFromBuildingsQueue(queue, index);
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
		const building = {
			ID: objID,
			time: this.Server.buildingFacade.getBuildingTime(objID)
		};
		this.Server.timerFacade.addTimer(this, building);
		this.actions.buildingQueue.push(building);
	}

	removeFromBuildingsQueue() {
		console.log('Removing');
		const q = this.actions.buildingQueue;
		q.shift();
		if(!this.checkLastBuilding(q)) {
			console.log('Starting new build');
			this.build();
		}
		console.log('No more buildings');
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
