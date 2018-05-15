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
import serializeObjectInArray from '../../../libs/utils/functions';

export default class CharacterFacade {
	constructor(Server) {
		this.Server = Server;

		this.managedCharacters = [];

		this.Server.log.debug('CharacterFacade::constructor Loaded');

		this.Server.socketFacade.on('dispatch', this.onDispatch.bind(this));
		this.Server.socketFacade.on('disconnect', (account) => {
			this.remove(account.userID);
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

	updateAllClients(property = null) {
		this.managedCharacters.forEach((character) => {
			const characterData = character.exportToClient();

			this.Server.socketFacade.dispatchToUser(character.userID, {
				type: CHARACTER_UPDATE,
				payload: property ? {[property]: characterData[property]} : characterData,
			});
		});
	}

	getName(characterName) {
		return serializeObjectInArray(this.managedCharacters, 'name_lowercase', characterName.toLowerCase());
	}

	get(userID) {
		if(!userID) {
			return null;
		}

		if (typeof userID != 'number') {
			userID = parseInt(userID);
		}

		return this.managedCharacters.find((obj) => obj.userID === userID) || null;
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
			},
		});
	}

	async getCharacterList(socket, action) {
		try {
			const managedCharacters = await db.characters.findAll({
				where:
				{
						userID:
						{
							 [db.Op.like]: [socket.account.userID]
						}
				},
			}).then(async(result) =>
			{
				return result;
			});

			this.Server.socketFacade.dispatchToSocket(socket, {
				type: CHARACTER_LIST,
				payload: managedCharacters.map((obj) => {
					return {
						name: obj.name,
						stats: obj.stats,
					};
				}),
			});
		} catch(err) {
			this.Server.onError(err, socket);
		}
	}

	replace(key, value) {
		if (typeof value === 'string') {
			return undefined;
		}

		return value;
	}

	async manage(character) {
		const wasLoggedIn = this.Server.socketFacade.clearTimer(character);
		const existingCharacter = this.managedCharacters.find((obj) => obj.userID === character.userID);
		const isLoggedIn = character.loggedIn;

		if (wasLoggedIn && existingCharacter) {
			await this.remove(character.userID);
		}

		//const successfullLogin = await this.loginCharacter(character.id);

		//if (successfullLogin) {
			//console.log('Success character DB login!');
			this.managedCharacters.push(character);
			this.dispatchUpdateCharacterList(character.userID);

			const socket = this.Server.socketFacade.get(character.userID);

			this.Server.socketFacade.dispatchToRoom(
				character.getSessionID(),
				this.joinedServer(character)
			);

			try {
				socket.join(character.getSessionID());
			} catch (err) {
				this.Server.onError(err, socket);
			}
		//}
	}

	async remove(userID) {

		if (typeof userID != 'number') {
			userID = parseInt(userID);
		}

		const character = this.get(userID);

		if (!character) {
			return;
		}

		//const successfullLogout = await this.logoutCharacter(character.id);

		//if (successfullLogout) {
			try {
				await this.save(character.userID);
			} catch (err) {
				this.Server.onError(err);
			}

			this.Server.socketFacade.dispatchToRoom(character.getSessionID(), {
				type: CHARACTER_LEFT_SERVER,
				payload: character.userID,
			});

			this.managedCharacters = this.managedCharacters.filter((obj) => obj.userID !== userID);

			this.dispatchRemoveFromCharacterList(userID);
		//}
	}

	async loginCharacter(charID) {
		//Testing and learning sequelize update
		//Move/merge this to load/save
		const result = await db.characters.findOne({
			where:
			{
				id:
				{
					[db.Op.like]: [charID]
				}
			}
		}).then ((success) => {
			if (success) {
				success.updateAttributes({
					loggedIn: true
				});
				return success;
			}
		}).catch(err => {
			if (err) {
				return 'Error: ' + err;
			}
		});

		return result.loggedIn;
	}

	async logoutCharacter(charID) {
		//Testing and learning sequelize update
		//Move/merge this to load/save
		const result = await db.characters.findOne({
			where:
			{
				id:
				{
					[db.Op.like]: [charID]
				}
			}
		}).then ((success) => {
			if (success) {
				success.updateAttributes({
					loggedIn: false
				});
				return success;
			}
		}).catch(err => {
			if (err) {
				return err;
			}
		});

		return result.loggedIn;
	}

	getOnline() {
		return this.managedCharacters.map((character) => ({
				name: character.name,
				userID: character.userID,
			})
		);
	}

	async load(userID, characterName) {
		const character = await this.databaseLoad(userID, characterName);

		if (character === null) {
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
			}
		}).catch(err => {
			if (err) {
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
			if (err) {
				return err;
			}
		});
		return newCharacter;
	}

	async saveAll() {
		await Promise.all(this.managedCharacters.map(async (character) => {
			try {
				return await this.save(character.userID);
			} catch(err) {
				this.Server.onError(err);
			}
		}));
	}

	async save(userID) {
		if (!userID) {
			throw new Error('No userID for save()');
		}

		if (typeof userID != 'number') {
			userID = parseInt(userID);
		}

		const character = this.get(userID);

		if (!character) {
			throw new Error(`No character found online, matching userID ${userID}`);
		}

		this.Server.log.info(`Saving characters ${userID}`);

		await this.databaseSave(character);

		this.Server.log.info(`Saved ${character.name} (${userID})`);
	}

	async databaseSave(character) {
		const dbSaveChar = {
			userID: character.userID,
			name: character.name,
		};

		return dbSaveChar;
	}

	getServerPlayerList(map, x = null, y = null, z = null, dispatch = false) {
		let players;

		if (!dispatch) {
			return players;
		}

		return players
			.filter((obj) => obj.userID !== ignore)
			.map((character) => {
				return this.joinedServer(character, false);
			});
	}

	joinedServer(character, action = true) {
		const details = {
			userID: character.userID,
			name: character.name,
		};

		if (!action) {
			return details;
		}

		return joinedServer(details);
	}

	removeFromServer(position, character) {
		const playersOnServer = this.locations[`${position.map}_${position.x}_${position.y}_${position.z}`];

		if (playersOnServer) {
			const i = playersOnServer.findIndex((char) => char.userID === character.userID);

			if (i !== -1) {
				playersOnServer.splice(i, 1);
			}
		}
	}

	addToServer(position, character) {
		const location = `${position.map}_${position.x}_${position.y}_${position.z}`;

		if (!this.locations[location]) {
			this.locations[location] = [];
		}

		if (this.locations[location].findIndex((char) => char.userID === character.userID) !== -1) {
			return;
		}

		this.locations[location].push(character);
	}

	getServerData() {
		return {
			serverMaps: this.Server.serverMapFacade.getList(),
			players: this.getOnline(),
		};
	}
}
