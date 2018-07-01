import {
	SERVER_LIST,
	GET_SERVER_LIST,
	SERVER_DETAILS,
} from 'libs/constants';

import ServerMap from './object';
import serverMapInputs from './inputs';

import db from 'libs/db';

export default class ServerMapFacade {
	constructor(Server) {
		this.Server = Server;

		this.test = [];

		this.serverMaps = [];

		this.Server.socketFacade.on('dispatch',
			this.onDispatch.bind(this)
		);
	}

	init() {
		this.loadAllServerMaps();
		this.Server.log.info('ServerMapFacade::constructor loaded');
	}

	async loadAllServerMaps() {
		const firstLoad = await this.getMultiverses();
		for(let a = 0; a < firstLoad.length; a++) {
			let multiverse = [];
			let universe = [];
			let supercluster = [];
			let localcluster = [];
			let interstellar = [];
			let galaxy = [];
			let solarsystem = [];
			let stars = [];
			const secondLoad = await this.getUniverses(firstLoad[a].dataValues.id);
			console.log(secondLoad.length);

			for(let b = 0; b < secondLoad.length; b++) {
				const thirdLoad = await this.getSuperclusters(secondLoad[b].dataValues.id);
				console.log(thirdLoad.length);

				for(let c = 0; c < thirdLoad.length; c++) {
					const fourthLoad = await this.getLocalclusters(thirdLoad[c].dataValues.id);
					console.log(fourthLoad.length);

					for(let d = 0; d < fourthLoad.length; d++) {
						const fifthLoad = await this.getInterstellar(fourthLoad[d].dataValues.id);
						console.log(fifthLoad.length);

						for(let e = 0; e < fifthLoad.length; e++) {
							const sixthLoad = await this.getGalaxy(fifthLoad[e].dataValues.id);
							console.log(sixthLoad.length);

							for(let f = 0; f < sixthLoad.length; f++) {
								const seventhLoad = await this.getSolarsystem(sixthLoad[f].dataValues.id);
								console.log(seventhLoad.length);

								for(let g = 0; g < seventhLoad.length; g++) {
									const eigthLoad = await this.getStars(seventhLoad[g].dataValues.id);
									console.log(eigthLoad.length);

									for(let h = 0; h < eigthLoad.length; h++) {
										solarsystem.push(eigthLoad[h].dataValues.name);
									}
									galaxy.push(solarsystem);
								}
								interstellar.push(galaxy);
							}
							localcluster.push(interstellar);
						}
						supercluster.push(localcluster);
					}
					universe.push(supercluster);
				}
				multiverse.push(universe);
			}
			this.test.push(multiverse);
		}

		const server = new ServerMap(this.Server, firstLoad[1]);
		this.serverMaps.push(server);
	}

	async getStars(id) {
		try {
			const object = await db.serverStars.findAll({
				where:
				{
					serverSolarsystemID:
					{
						[db.Op.like]: [id]
					}
				}
			}).then(result =>
			{
				return result;
			}).catch (err => {
				console.log('\nFailed getting server map!\n', err);
				return err;
			});
			return object;
		} catch(err) {
			this.Server.onError(err);
		}
	}

	async getSolarsystem(id) {
		try {
			const object = await db.serverSolarsystems.findAll({
				where:
				{
					serverGalaxyID:
					{
						[db.Op.like]: [id]
					}
				}
			}).then(result =>
			{
				return result;
			}).catch (err => {
				console.log('\nFailed getting server map!\n', err);
				return err;
			});
			return object;
		} catch(err) {
			this.Server.onError(err);
		}
	}

	async getGalaxy(id) {
		try {
			const object = await db.serverGalaxies.findAll({
				where:
				{
					serverInterstellarID:
					{
						[db.Op.like]: [id]
					}
				}
			}).then(result =>
			{
				return result;
			}).catch (err => {
				console.log('\nFailed getting server map!\n', err);
				return err;
			});
			return object;
		} catch(err) {
			this.Server.onError(err);
		}
	}

	async getInterstellar(id) {
		try {
			const object = await db.serverInterstellars.findAll({
				where:
				{
					serverLocalclusterID:
					{
						[db.Op.like]: [id]
					}
				}
			}).then(result =>
			{
				return result;
			}).catch (err => {
				console.log('\nFailed getting server map!\n', err);
				return err;
			});
			return object;
		} catch(err) {
			this.Server.onError(err);
		}
	}

	async getLocalclusters(id) {
		try {
			const object = await db.serverLocalclusters.findAll({
				where:
				{
					serverSuperclusterID:
					{
						[db.Op.like]: [id]
					}
				}
			}).then(result =>
			{
				return result;
			}).catch (err => {
				console.log('\nFailed getting server map!\n', err);
				return err;
			});
			return object;
		} catch(err) {
			this.Server.onError(err);
		}
	}

	async getSuperclusters(id) {
		try {
			const object = await db.serverSuperclusters.findAll({
				where:
				{
					serverUniverseID:
					{
						[db.Op.like]: [id]
					}
				}
			}).then(result =>
			{
				return result;
			}).catch (err => {
				console.log('\nFailed getting server map!\n', err);
				return err;
			});
			return object;
		} catch(err) {
			this.Server.onError(err);
		}
	}

	async getUniverses(id) {
		try {
			const object = await db.serverUniverses.findAll({
				where:
				{
					serverMultiverseID:
					{
						[db.Op.like]: [id]
					}
				}
			}).then(result =>
			{
				return result;
			}).catch (err => {
				console.log('\nFailed getting server map!\n', err);
				return err;
			});
			return object;
		} catch(err) {
			this.Server.onError(err);
		}
	}

	async getMultiverses() {
		//Apparently I can do this...
		//And it sucked doing it like that! Kukuku... I'm stupid x)
		try {
			const object = await db.serverMultiverses.findAll({
				order: [
					['name', 'ASC'],
				]
			}).then(result =>
			{
				return result;
			}).catch (err => {
				console.log('\nFailed getting server map!\n', err);
				return err;
			});
			return object;
		} catch(err) {
			this.Server.onError(err);
		}
	}

	getByID(source, ID){

	}

	getRandomInt(max) {
		return Math.floor(Math.random() * Math.floor(max));
	}

	randomizeLocation() {
		const rndMultiverse = this.serverMaps[this.getRandomInt(this.serverMaps.length)].dataValues.name;
		console.log(this.serverMaps);
		return {
			multiverse: {
				x: this.getRandomInt(7),
				y: this.getRandomInt(7),
				z: this.getRandomInt(7),
				name: rndMultiverse,
			},
			universe: {
				x: this.getRandomInt(7),
				y: this.getRandomInt(7),
				z: this.getRandomInt(7),
				name: 'random'
			},
			supercluster: {
				x: this.getRandomInt(7),
				y: this.getRandomInt(7),
				z: this.getRandomInt(7),
				name: 'random'
			},
			localcluster: {
				x: this.getRandomInt(7),
				y: this.getRandomInt(7),
				z: this.getRandomInt(7),
				name: 'random'
			},
			galaxy: {
				x: this.getRandomInt(7),
				y: this.getRandomInt(7),
				z: this.getRandomInt(7),
				name: 'random'
			},
			interstellar: {
				x: this.getRandomInt(7),
				y: this.getRandomInt(7),
				z: this.getRandomInt(7),
				name: 'random'
			},
			solarsystem: {
				x: this.getRandomInt(7),
				y: this.getRandomInt(7),
				z: this.getRandomInt(7),
				name: 'random'
			},
		};
	}

	friendLocation(friend) {
		return {
			multiverse: {
				x: 0,
				y: 0,
				z: 0,
				name: 'random'
			},
			universe: {
				x: 0,
				y: 0,
				z: 0,
				name: 'random'
			},
			supercluster: {
				x: 0,
				y: 0,
				z: 0,
				name: 'random'
			},
			localcluster: {
				x: 0,
				y: 0,
				z: 0,
				name: 'random'
			},
			galaxy: {
				x: 0,
				y: 0,
				z: 0,
				name: 'random'
			},
			interstellar: {
				x: 0,
				y: 0,
				z: 0,
				name: 'random'
			},
			solarsystem: {
				x: 0,
				y: 0,
				z: 0,
				name: 'random'
			},
		};
	}

	serverLocation(server) {
		return {
			multiverse: {
				x: this.getRandomInt(7),
				y: this.getRandomInt(7),
				z: this.getRandomInt(7),
				name: (server === 'tutorial' ? 'SOMEWHERE' : server),
			},
			universe: {
				x: this.getRandomInt(7),
				y: this.getRandomInt(7),
				z: this.getRandomInt(7),
				name: (server === 'tutorial' ? 'DEEP' : 'universe'),
			},
			supercluster: {
				x: this.getRandomInt(7),
				y: this.getRandomInt(7),
				z: this.getRandomInt(7),
				name: (server === 'tutorial' ? 'IN' : 'supercluster'),
			},
			localcluster: {
				x: this.getRandomInt(7),
				y: this.getRandomInt(7),
				z: this.getRandomInt(7),
				name: (server === 'tutorial' ? 'THE' : 'localcluster'),
			},
			galaxy: {
				x: this.getRandomInt(7),
				y: this.getRandomInt(7),
				z: this.getRandomInt(7),
				name: (server === 'tutorial' ? 'MILKYWAY' : 'galaxy'),
			},
			interstellar: {
				x: this.getRandomInt(7),
				y: this.getRandomInt(7),
				z: this.getRandomInt(7),
				name: (server === 'tutorial' ? 'DARK' : 'interstellar'),
			},
			solarsystem: {
				x: this.getRandomInt(7),
				y: this.getRandomInt(7),
				z: this.getRandomInt(7),
				name: (server === 'tutorial' ? 'SPACE' : 'solarsystem'),
			},
		};
	}

	onDispatch(socket, action) {
		switch (action.type) {
			case GET_SERVER_LIST:
				return this.dispatchMapList(socket, action);
		}

		return null;
	}

	dispatchMapList(socket) {
		const list = this.getList();

		this.Server.socketFacade.dispatchToSocket(socket, {
			type: SERVER_LIST,
			payload: list,
		});
	}

	getList() {
		const list = {};

		Object.keys(this.serverMaps).forEach((serverID) => {
			list[serverID] = {
				name: this.serverMaps[serverID].getName(),
				gridSize: this.serverMaps[serverID].getGrid(),
			};
		});
		console.log(list);
		return list;
	}
}
