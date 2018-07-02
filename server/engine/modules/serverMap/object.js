export default class ServerMap {
	constructor(Server, server, data) {
		this.Server = Server;

		this.data = data;

		Object.assign(this, {
			...server.dataValues,
		});

		if (this.id) {
			this.init();
		}
	}

	init() {
		console.log('\nRunning server data init for: ', this.name);
		if(this.data.length !== 0) {
			//console.log(this.data[1].supercluster[0].localcluster[0].interstellar[0].galaxy[0].solarsystem);
		}
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
