export default class ServerMap {
	constructor(Server, data) {
		this.Server = Server;

		Object.assign(this, {
			...data.dataValues,
		});

		if (this.id) {
			this.init();
		}
	}

	init() {
		console.log('\nRunning server data init for: ', this.name);
	}

	loadServer() {
		return this.name;
	}

	getName() {
		return this.name;
	}

	getGrid() {
		return {
			x: this.gridSizeX,
			y: this.gridSizeY,
			z: this.gridSizeZ,
		};
	}

	isInsideGrid(x, y, z) {
		x = parseInt();
		y = parseInt();
		z = parseInt();

		if (isNaN(x) || isNaN(y) || isNaN(z)) {
			return false;
		}

		if (z < 0 || z > this.gridSize.z) {
			return false;
		}

		if (y < 0 || y > this.gridSize.y) {
			return false;
		}

		if (x < 0 || x > this.gridSize.x) {
			return false;
		}

		return true;
	}
}
