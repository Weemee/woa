

export default class TimerFacade {
	constructor(Server) {
		this.Server = Server;

		this.managedTimers = [];

		this.Server.log.info('TimerFacade::constructor Loaded');

		this.garbageCollection = this.garbageCollection.bind(this);
	}

	addLoop(character) {
		this.managedTimers.push({
			id: character.userID,
			timer: setInterval(() => {this.Server.characterFacade.updateClient(character.userID);}, 1000),
		});
		console.log(this.managedTimers);

		console.log('Added game loop for character: ', character.userID);
	}

	removeLoop(character) {
		this.managedTimers = this.managedTimers.filter((obj) => {
			console.log('Before: ', obj.timer);
			if(obj.id === character.userID) {
				clearInterval(obj.timer);
				obj.id !== character.userID;
			}
			console.log('After: ', obj.timer);
		});
		console.log('Removed game loop for character: ', character.userID);
		console.log(this.managedTimers);
	}

	garbageCollection() {

	}
}