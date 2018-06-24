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

		this.loadedData = [];
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
		const firstLoad = await this.generateServerMap();

		for (let i = 0; i < firstLoad.length; i++) {
			this.loadedData[i.id] = new ServerMap(this.Server, firstLoad[i]);
			this.serverMaps.push(this.loadedData[i.id]);
		}
	}

	async generateServerMap() {
		//Apparently I can do this...
		let objects;
		try {
			objects = await db.serverMultiverses.findAll({
				include: [
					{
						model: db.serverUniverses,
						as: 'universes',
						include: [
							{
								model: db.serverSuperclusters,
								as: 'superclusters',
								include: [
									{
										model: db.serverLocalclusters,
										as: 'localclusters',
										include: [
											{
												model: db.serverInterstellars,
												as: 'interstellars',
												include: [
													{
														model: db.serverGalaxies,
														as: 'galaxies',
														include: [
															{
																model: db.serverSolarsystems,
																as: 'solarsystems',
															}
														]
													}
												]
											}
										]
									}
								]
							}
						]
					}
				],
				order: [
					['name', 'ASC'],
				]
			},
			{
				raw: true
			}).then(result =>
			{
				return result;
			}).catch (err => {
				console.log('\nFailed getting server map!\n', err);
				return err;
			});

		} catch(err) {
			this.Server.onError(err);
		}
		return objects;
	}

	getByID(source, ID){

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
