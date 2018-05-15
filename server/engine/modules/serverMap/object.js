import fs from 'fs';

//Default path
//
export default class ServerMap {
	constructor(Server, data) {
		this.Server = Server;

		this.multiverses = [];
		this.universes = [];
		this.superclusters = [];
		this.localclusters = [];
		this.interstellar = [];
		this.galaxies = [];
		this.solarsystems = [];
		this.stars = [];
		this.planets = [];

		Object.assign(this, data);

		if (this.dataValues.id) {
			this.init();
		}
	}

	init() {
		console.log('\nRunning server data init for: ', this.dataValues.name);

		//this.multiverses = await this.loadMultiverse();

		//this.universes = await this.loadUniverse();

		//this.superclusters = await this.loadSupercluster();

		//this.localclusters = await this.loadLocalcluster();

		//this.interstellar = await this.loadInterstellar();

		//this.galaxies = await this.loadGalaxy();

		//this.solarsystems = await this.loadSolarsystem();

		//this.stars = await this.loadStars();

		//this.planets = await this.loadPlanets();

		console.log('Done');
	}

	loadServer() {
		return this.dataValues.name;
	}

	getName() {
		return this.dataValues.name;
	}

	getGrid() {
		return {
			x: this.dataValues.gridSizeX,
			y: this.dataValues.gridSizeY,
			z: this.dataValues.gridSizeZ,
		};
	}

	async loadMultiverse() {

	}

	async loadUniverse() {

	}

	async loadSupercluster() {

	}

	async loadLocalcluster() {

	}

	async loadInterstellar() {

	}

	async loadGalaxy() {

	}

	async loadSolarsystem() {

	}

	async loadStars() {

	}

	async loadPlanets() {

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
