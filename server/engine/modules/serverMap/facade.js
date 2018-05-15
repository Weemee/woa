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
		this.serverMaps = {};
		this.Server.socketFacade.on('dispatch',
			this.onDispatch.bind(this)
		);
	}

	init() {
		this.Server.log.info('ServerMapFacade::constructor loaded');
		this.loadAllServerMaps();
	}

	async loadAllServerMaps() {
		const temp = this.loadMultiverse();
		console.log(temp);
		this.loadUniverse();
		this.loadSupercluster();
		this.loadLocalcluster();
		this.loadInterstellar();
		this.loadGalaxy();
		this.loadSolarsystem();
		this.loadStars();
		this.loadPlanets();

		this.generateServerMap();
	}

	async loadMultiverse() {
		try {
			const managedCharacters = await db.multiverses.all().then(async(result) =>
			{
				return result;
			});

		} catch(err) {
			this.Server.onError(err);
		}
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

	generateServerMap() {

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

		//Add list Object

		return list;
	}
}
