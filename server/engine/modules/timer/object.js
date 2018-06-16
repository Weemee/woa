export default class Timer {
	constructor(source, time) {
		this.source = source;

		this.time = time || 0;

		this.steps = (1000 * time) / 100;

		this.timer = null;

		this.paused = true;

		this.terminate = false;
	}

	start() {
		if(this.timer !== null) {
			return;
		}

		if(this.time <= 0) {
			return;
		}

		this.paused = false;

		this.timer = setInterval(() => {
			if(!this.paused) {
				this.steps--;
				console.log(this.steps);

				if(this.steps === 0) {
					this.terminate = true;
					clearInterval(this.timer);
				}
			}
		}, 100);
	}

	stop() {
		if(this.terminate) {
			return;
		}
		
		this.paused = true;
	}
}