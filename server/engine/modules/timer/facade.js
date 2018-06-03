

export default class TimerFacade {
	constructor(Server) {
		this.Server = Server;

		this.managedTimers = [];

		this.Server.log.info('TimerFacade::constructor Loaded');

		this.garbageCollection = this.garbageCollection.bind(this);
	}

	addLoop(character) {
		this.managedTimers.push({
			char: character,
			timer: setInterval(() => {
				character.checkUpdates();
				this.Server.characterFacade.updateClient(character.userID);
			}, 1000),
		});

		console.log('Added game loop for character: ', character.userID);
	}

	removeLoop(character) {
		this.managedTimers = this.managedTimers.filter((obj) => {
			if(obj.char.userID === character.userID) {
				clearInterval(obj.timer);
				obj.char.userID !== character.userID;
			}
		});
		console.log('Removed game loop for character: ', character.userID);
	}

	addCooldown() {

	}

	removeCooldown() {

	}

	garbageCollection() {

	}
}