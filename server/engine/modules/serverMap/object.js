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
		//console.log(this.multiverses);

		//this.universes = await this.loadUniverse();
		//console.log(this.universes);

		//this.superclusters = await this.loadSupercluster();
		//console.log(this.superclusters);

		//this.localclusters = await this.loadLocalcluster();
		//console.log(this.localclusters);

		//this.interstellar = await this.loadInterstellar();
		//console.log(this.interstellar);

		//this.galaxies = await this.loadGalaxy();
		//console.log(this.galaxies);

		//this.solarsystems = await this.loadSolarsystem();
		//console.log(this.solarsystems);

		//this.stars = await this.loadStars();
		//console.log(this.stars);

		//this.planets = await this.loadPlanets();
		//console.log(this.planets);
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
		};
	}

	async loadMultiverse() {
		let objects;
		try {
			objects = await db.multiverses.findAll({
				raw: true
			}).then(result =>
			{
				console.log('\nSuccess getting multiverse!\n');
				return result;
			}).catch (err => {
				console.log('\nFailed getting multiverse!\n', err);
				return err;
			});

		} catch(err) {
			this.Server.onError(err);
		}
		return objects;
	}

	async loadUniverse() {
		let objects;
		try {
			objects = await db.universes.findAll({
				raw: true
			}).then(result =>
			{
				console.log('\nSuccess getting universes!\n');
				return result;
			}).catch (err => {
				console.log('\nFailed getting universes!\n', err);
				return err;
			});

		} catch(err) {
			this.Server.onError(err);
		}
		return objects;
	}

	async loadSupercluster() {
		let objects;
		try {
			objects = await db.superclusters.findAll({
				raw: true
			}).then(result =>
			{
				console.log('\nSuccess getting superclusters!\n');
				return result;
			}).catch (err => {
				console.log('\nFailed getting superclusters!\n', err);
				return err;
			});

		} catch(err) {
			this.Server.onError(err);
		}
		return objects;
	}

	async loadLocalcluster() {
		let objects;
		try {
			objects = await db.localclusters.findAll({
				raw: true
			}).then(result =>
			{
				console.log('\nSuccess getting localclusters!\n');
				return result;
			}).catch (err => {
				console.log('\nFailed getting localclusters!\n', err);
				return err;
			});

		} catch(err) {
			this.Server.onError(err);
		}
		return objects;
	}

	async loadInterstellar() {
		let objects;
		try {
			objects = await db.interstellars.findAll({
				raw: true
			}).then(result =>
			{
				console.log('\nSuccess getting interstellar!\n');
				return result;
			}).catch (err => {
				console.log('\nFailed getting interstellar!\n', err);
				return err;
			});

		} catch(err) {
			this.Server.onError(err);
		}
		return objects;
	}

	async loadGalaxy() {
		let objects;
		try {
			objects = await db.galaxies.findAll({
				raw: true
			}).then(result =>
			{
				console.log('\nSuccess getting galaxies!\n');
				return result;
			}).catch (err => {
				console.log('\nFailed getting galaxies!\n', err);
				return err;
			});

		} catch(err) {
			this.Server.onError(err);
		}
		return objects;
	}

	async loadSolarsystem() {
		let objects;
		try {
			objects = await db.solarsystems.findAll({
				raw: true
			}).then(result =>
			{
				console.log('\nSuccess getting solarsystems!\n');
				return result;
			}).catch (err => {
				console.log('\nFailed getting solarsystems!\n', err);
				return err;
			});

		} catch(err) {
			this.Server.onError(err);
		}
		return objects;
	}

	async loadStars() {
		let objects;
		try {
			objects = await db.stars.findAll({
				raw: true
			}).then(result =>
			{
				console.log('\nSuccess getting stars!\n');
				return result;
			}).catch (err => {
				console.log('\nFailed getting stars!\n', err);
				return err;
			});

		} catch(err) {
			this.Server.onError(err);
		}
		return objects;
	}

	async loadPlanets() {
		let objects;
		try {
			objects = await db.planets.findAll({
				raw: true
			}).then(result =>
			{
				console.log('\nSuccess getting planets!\n');
				return result;
			}).catch (err => {
				console.log('\nFailed getting planets!\n', err);
				return err;
			});

		} catch(err) {
			this.Server.onError(err);
		}
		return objects;
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
