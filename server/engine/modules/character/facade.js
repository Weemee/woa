import Promise from 'bluebird';

import {
	CHARACTER_UPDATE,
	CHARACTER_ONLINE,
	CHARACTER_OFFLINE,
	GET_CHARACTER_LIST,
	CHARACTER_LIST,
} from 'libs/constants';

import Character from './object';
import characterInput from './input';

import db from '../../api/models';

export default class CharacterFacade {
	constructor(Server) {
		this.Server = Server;

		this.characters = [];

		this.Server.log.debug('CharacterFacade::constructor Loaded');

		this.Server.socketFacade.on('dispatch', this.onDispatch.bind(this));
		this.Server.socketFacade.on('disconnect', (user) => {
			this.remove(user.userID);
		});
	}

	init() {
		this.Server.inputFacade.registerFacade(characterInput);
		this.Server.log.info('CharacterFacade::constructor loaded');
	}

	onDispatch(socket, action) {
		switch(action.type) {
			case GET_CHARACTER_LIST:
				return this.getCharacterList(socket, action);
		}

		return null;
	}

	updateClient(userID, property = null) {
		const character = this.get(userID);

		if(!character) {
			return;
		}

		const characterData = character.exportToClient();

		this.Server.socketFacade.dispatchToUser(userID, {
			type: CHARACTER_UPDATE,
			payload: property ? {[property]: characterData[property]} : characterData,
		});
	}

	get(userID) {
		if(!userID) {
			return null;
		}

		return this.characters.find((obj) => obj.userID === userID) || null;
	}

	async getCharacterList(socket, action) {
		try {
			const characters = await db.characters.findAll({
				where:
				{
						userID:
						{
							 [db.Op.like]: [socket.user.userID]
						}
				},
			}).then(async(result) =>
			{
				return result;
			});

			this.Server.socketFacade.dispatchToSocket(socket, {
				type: CHARACTER_LIST,
				payload: characters.map((obj) => {
					return {
						name: obj.name,
					};
				}),
			});
		} catch(err) {
			this.Server.onError(err, socket);
		}
	}

	async manage(character) {
		console.log('We managed stuff!');
		const wasLoggedIn = this.Server.socketFacade.clearTimer(character.userID);
		const existingCharacter = this.characters.find((obj) => obj.userID === character.userID);

		if(wasLoggedIn && existingCharacter) {
			await this.remove(character.userID);
		}

		this.characters.push(character);
		this.dispatchUpdateCharacterList(character.userID);

		const socket = this.Server.socketFacade.get(character.userID);

		try {
			socket.join(character);
		} catch (err) {
			this.Server.onError(err, socket);
		}
	}

	async remove(userID) {
		const character = this.get(userID);

		if(!character) {
			return;
		}

		try {
			await this.save(character.userID);
		} catch (err) {
			this.Server.onError(err);
		}

		this.characters = this.characters.filter((obj) => obj.userID !== userID);
		this.dispatchRemoveFromCharacterList(userID);
	}

	getOnline() {
		return this.characters.map((character) => ({
				name: character.name,
				userID: character.userID,
			})
		);
	}

	async load(userID, characterName) {
		const character = 'temp';

		if(character === null) {
			return null;
		}

		const newCharacter = new Character(this.Server, character.toObject());

		return newCharacter;
	}

	databaseLoad(userID, characterName) {
		return 'Symmetra yuck';
	}

	async create(userID, characterName) {
		console.log('Start create!');
		const character = this.databaseCreate(userID, characterName);//await this.databaseCreate(userID, characterName);
		console.log('New create!');
		const newCharacter = new Character(this.Server, character);
		console.log('Created: ' + newCharacter);

		return newCharacter;
	}

	databaseCreate(userID, characterName) {
		const newCharacter = {
			userID: userID,
			name: characterName,
		};
		return newCharacter;
	}

	async saveAll() {
		await Promise.all(this.characters.map(async (character) => {
			try {
				return await this.save(character.userID);
			} catch(err) {

			}
		}));
	}

	async save(userID) {
		if(!userID) {
			throw new Error('No userID for save()');
		}

		const character = this.get(userID);

		if(!character) {
			throw new Error('No character found online, matching userID ${userID}');
		}

		this.Server.log.info(`Saving characters ${userID}`);

		await this.databaseSave(character);

		this.Server.log.info(`Saved ${character.name} (${userID})`);
	}

	async databaseSave(character) {
		const dbCharacter = {
			userID: userID,
			name: characterName,
		};

		return dbCharacter;
	}

	getGameData() {
		return {
			players: this.getOnline(),
		};
	}
}