import fs from 'fs';

//Default path
//
export default class ServerMap {
	constructor(Server, data) {
		this.Server = Server;

		this.superClusters = [];
		this.localClusters = [];
		this.galaxies = [];
		this.interstellarNeighborhoods = [];
		this.solarSystems = [];
		this.stars = [];
		this.biospheres = [];

		Object.assign(this, data);
	}

	async loadInstances(dir, path) {
		await this.loadUniverses(dir, path);
	}

	loadUniverses(dir, path) {
		if (fs.existsSync(`${dir}/universes`))
		{
			const mapList = fs.readdirSync(`${dir}/universes`);

			mapList.map((mapName) => {
				if (mapName[0] === '.') {
					return;
				}

				const newPath = `${path}/universes/${mapName}`;
				const newDir = `${dir}/universes/${mapName}`;
				let mapData = require(`${newPath}/universe`);

				if (mapData.superclusters.length < 1) {
					this.loadSuperClusters(newDir, newPath);
				}

				mapData.superclusters = this.superClusters;
				this.universes.push(mapData);
			});

			return;
		}

		return;
	}

	getUniverses() {
		return this.superClusters;
	}

	async loadSuperClusters(dir, path) {
		if (fs.existsSync(`${dir}/superclusters`))
		{
			const mapList = fs.readdirSync(`${dir}/superclusters`);

			mapList.map((mapName) => {
				if (mapName[0] === '.') {
					return;
				}

				const newPath = `${path}/superclusters/${mapName}`;
				const newDir = `${dir}/superclusters/${mapName}`;
				let mapData = require(`${newPath}/supercluster`);

				this.superClusters.push(mapData);
			});

			return;
		}

		return;
	}

	loadLocalClusters(path) {

	}

	loadGalaxies(path) {

	}

	loadInterstellarNeighborhoods(path) {

	}

	loadSolarSystems(path) {

	}

	loadStars(path) {

	}

	loadPlanets(path) {

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
