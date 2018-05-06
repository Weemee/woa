import Promise from 'bluebird';

import {
	CHARACTER_UPDATE,
	CHARACTER_ONLINE,
	CHARACTER_OFFLINE,
	CHARACTER_GET_LIST,
	CHARACTER_LIST,
	CHARACTER_LEFT_SERVER,
} from 'libs/constants';

import Character from './object';
import characterInput from './input';

import {joinedServer} from './actions';

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
			case CHARACTER_GET_LIST:
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

	dispatchUpdateCharacterList(userID) {
		const character = this.get(userID);

		if (!character) {
			return;
		}

		this.Server.socketFacade.dispatchToRoom('server', {
			type: CHARACTER_ONLINE,
			payload: {
				userID: character.userID,
				name: character.name,
			},
		});
	}

	dispatchRemoveFromCharacterList(userID) {
		this.Server.socketFacade.dispatchToRoom('server', {
			type: CHARACTER_OFFLINE,
			payload: {
				userID,
			}
		});
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
		const wasLoggedIn = this.Server.socketFacade.clearTimer(character.userID);
		const existingCharacter = this.characters.find((obj) => obj.userID === character.userID);

		if (wasLoggedIn && existingCharacter) {
			await this.remove(character.userID);
		}

		if (wasLoggedIn) {
			await this.remove(character.userID);
		}

		if (existingCharacter) {
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
		const character = await this.databaseLoad(userID, characterName);

		if(character === null) {
			return null;
		}

		const newCharacter = new Character(this.Server, character);

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
		}).catch(err => {
			if(err) {
				return 'Error load character.';
			}
		});
		return newCharacter;
	}

	async create(userID, characterName) {
		const character = await this.databaseCreate(userID, characterName);
		const newCharacter = new Character(this.Server, character);

		return newCharacter;
	}

	async databaseCreate(userID, characterName) {
		const newCharacter = await db.characters.create({
			userID: userID,
			name: characterName,
		}).catch(err => {
			if(err) {
				return err;
			}
		});
		return newCharacter;
	}

	async saveAll() {
		await Promise.all(this.characters.map(async (character) => {
			try {
				return await this.save(character.userID);
			} catch(err) {
				this.Server.onError(err);
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
			userID: character.userID,
			name: character.name,
		};

		return;
	}

	joinedServer(character, action = true) {
		const details = {
			userID: character.userID,
			name: character.name,
		};

		if (!action) {
			return details;
		}
		// joinedServer(details)
		return;
	}

	removeFromServer(position, character) {

	}

	addToServer(position, character) {

	}

	getServerData() {
		return {
			players: this.getOnline(),
		};
	}
}
