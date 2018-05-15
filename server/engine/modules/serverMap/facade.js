import fs from 'fs';
import {
	SERVER_LIST,
	GET_SERVER_LIST,
	SERVER_DETAILS,
} from 'libs/constants';

import ServerMap from './object';
import serverMapInputs from './inputs';

import db from '../../api/models';

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
		this.Server.log.info('ServerMapFacade::constructor loaded');
		this.loadAllServerMaps();
	}

	async loadAllServerMaps() {
		const firstLoad = await this.generateServerMap();
		//console.log('Loaded data: ', JSON.stringify(this.loadedData.find((obj) => obj.id === 3), null, 2));
		for (let i = 0; i < firstLoad.length; i++) {
			this.loadedData[i.id] = new ServerMap(this.Server, firstLoad[i]);
			this.serverMaps.push(this.loadedData[i.id]);
		}
		console.log('\n', this.getList());
	}

	async generateServerMap() {
		//Apparently I can do this...
		let objects;
		try {
			objects = await db.multiverses.findAll({
				include: [
					{
						model: db.universes,
						include: [
							{
								model: db.superclusters,
								include: [
									{
										model: db.localclusters,
										include: [
											{
												model: db.interstellars,
												include: [
													{
														model: db.galaxies,
														include: [
															{
																model: db.solarsystems,
																include: [
																	{
																		model: db.stars,
																	},
																	{
																		model: db.planets,
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
						]
					}
				],
				order: [
				['id', 'ASC']
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

	async load(userID, characterName) {
		const character = await this.databaseLoad(userID, characterName);

		if (character === null) {
			return null;
		}

		console.log('Character::load, Load character object...');
		const newCharacter = new Character(this.Server, character);

		console.log('Character::load, Returning object!');
		return newCharacter;
	}

	async databaseLoad(userID, characterName) {
		const newCharacter = await db.characters.findOne({
			where:
			{
				[db.Op.and]: [
				{
					userID:
					{
						[db.Op.like]: [userID]
					}
				},
				{
					nameLowercase:
					{
						[db.Op.like]: [characterName.toLowerCase()]
					}
				}]
			},
			//raw: true
		}).catch(err => {
			if (err) {
				return 'Error load character.';
			}
		});
		return newCharacter;
	}

	onDispatch(socket, action) {
		switch (action.type) {
			case GET_SERVER_LIST:
				return this.dispatchMapList(socket, action);
		}

		return null;
	}

	dispatchMapList() {
		const list = this.getList();

		this.Server.socketFacade.dispatchToSocket(socket, {
			type: SERVER_LIST,
			payload: list,
		});
	}

	getList() {
		const list = {};

		Object.keys(this.serverMaps).forEach((serverID) => {
			console.log(serverID);
			list[serverID] = {
				name: this.serverMaps[serverID].getName(),
				gridSize: this.serverMaps[serverID].getGrid(),
			};
		});

		return list;
	}
}
