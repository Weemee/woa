export default class Timer {
	constructor(character, object) {
		this.character = character;

		this.source = object.ID;

		this.time = object.time || 0;

		this.steps =  ((1000 * object.time) / 100) - (object.steps || 0);
		console.log(object.steps, '\n', this.steps);

		this.timer = null;

		this.paused = true;

		this.started = false;

		this.terminate = false;
	}

	start() {
		if(this.timer !== null) {
			return;
		}

		if(this.time <= 0) {
			return;
		}

		if(!this.started) {
			this.started = true;
		}

		this.timer = setInterval(() => {
			if(!this.paused) {
				this.steps--;
				//console.log('\nObject:', this.steps);

				if(this.steps === 0) {
					this.terminate = true;
					clearInterval(this.timer);
				}
			}
		}, 100);
	}
}