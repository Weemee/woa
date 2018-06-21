import Timer from './object';

export default class TimerFacade {
	constructor(Server) {
		this.Server = Server;

		this.managedTimers = [];

		this.Server.log.info('TimerFacade::constructor Loaded');

		this.garbageCollection = this.garbageCollection.bind(this);
	}

	addLoop(character) {
		character.initCharacter();
		this.managedTimers.push({
			char: character,
			timer: setInterval(() => {
				if(!character.paused) {
					character.checkUpdates();
					this.Server.characterFacade.updateClient(character.userID);
				}
			}, 1000 * character.getModifier('loopSpeed')),
		});

		console.log('Added game loop for character: ', character.userID);
	}

	removeLoop(character) {
		this.managedTimers = this.managedTimers.filter((obj) => {
			if(obj.char.userID === character.userID) {
				clearInterval(obj.timer);
				obj.char.userID !== character.userID;
				console.log('Removed game loop for character: ', character.userID);
			}
		});
	}

	checkLoopExist(character) {
		return true;
	}

	addTimer(character, object) {
		if(!object.time) {
			object.time = 1;
		}

		const newTimer = new Timer(character, object);
		character.timers.push(newTimer);
	}

	garbageCollection(character) {
		character.timers.map((obj) => {
			if(obj.terminate) {
				character.timers = character.timers.filter((o) => !o.terminate);
				character.removeFromBuildingsQueue();
			}
		});
	}
}