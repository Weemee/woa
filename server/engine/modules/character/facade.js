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
		this.Server.socketFacade.on('disconnect', (user) => {
			console.log('Character::constructor, on disconnect');
			this.remove(user.userID);
			console.log('Character::constructor, on disconnect, removed character?');
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
		console.log('Character::updateClient');

		if(!character) {
			console.log('Character::updateClient, no character...');
			return;
		}

		const characterData = character.exportToClient();

		console.log('Character::updateClient, dispatchToUser: ' + userID + ' & payload: ' + property ? {[property]: characterData[property]} : characterData);
		this.Server.socketFacade.dispatchToUser(userID, {
			type: CHARACTER_UPDATE,
			payload: property ? {[property]: characterData[property]} : characterData,
		});
	}

	updateAllClients(property = null) {
		console.log('Character::updateAllClients');
		this.managedCharacters.forEach((character) => {
			const characterData = character.exportToClient();

			console.log('Character::updateAllClients, dispatchToUser: ' + character.userID + ' & payload: ' + property ? {[property]: characterData[property]} : characterData);
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
			console.log('CharacterFacade::get(userID), no userID provided...');
			return null;
		}

		console.log('\nType of save: ' + typeof(userID));
		console.log('\nType of save: ' + typeof(66) + '\n');

		if (typeof userID != 'number') {
			console.log('NOT AN INT, fixing!');
			userID = parseInt(userID);
		}

		console.log('Getting character: ' + userID);

		// this.characters.find((obj) => obj.userID === userID)
		// this.characters.find((obj) => obj.userID === character.userID)
		return this.managedCharacters.find((obj) => obj.userID === userID) || null;
	}

	dispatchUpdateCharacterList(userID) {
		const character = this.get(userID);

		if (!character) {
			return;
		}

		console.log('Dispatch character online');
		this.Server.socketFacade.dispatchToRoom('server', {
			type: CHARACTER_ONLINE,
			payload: {
				userID: character.userID,
				name: character.name,
			},
		});
	}

	dispatchRemoveFromCharacterList(userID) {
		console.log('Dispatch character offline');
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
							 [db.Op.like]: [socket.user.userID]
						}
				},
			}).then(async(result) =>
			{
				return result;
			});

			console.log('Dispatch character list');
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
	/*
		const derpa = Object.keys(action).length;
        console.log('Length of ' + action + ': ' + derpa + '\n');

        let result = '';

        for (let i = 0; i < derpa; i++) {
            const a = Object.entries(action)[i];
            result += 'Item: ' + a;

            for (let j = 0; j < Object.keys(a).length; j++) {
                const b = Object.entries(a[i])[j];
                result += ' & contains: ' + b;
                //console.log('Item: ' + a[i] + ' & with content: ' + b + '\n');
            }
            result += '.';
            console.log(result);
        }
	 */

	async manage(character) {
		const wasLoggedIn = this.Server.socketFacade.clearTimer(character);
		console.log('Manage::Logged in: ' + wasLoggedIn);
		const existingCharacter = this.managedCharacters.find((obj) => obj.userID === character.userID);
		const isLoggedIn = character.loggedIn;
		console.log('Manage::Is the character logged in?: ' + existingCharacter);

		console.log('\nType of character: ' + typeof(character.userID));
		console.log('\nType of character: ' + typeof(66) + '\n');

		if (wasLoggedIn && existingCharacter) {
			//console.log('Manage::Existing character: ' + character.loggedIn);
			console.log('Manage::wasLoggedIn && existingCharacter, Call::remove!');
			await this.remove(character.userID);
		}

		//const successfullLogin = await this.loginCharacter(character.id);

		//console.log('The const: ' + successfullLogin);

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
				console.log('Manage::socket.join: ' + character.getSessionID());
			} catch (err) {
				this.Server.onError(err, socket);
			}
		//}
	}

	async remove(userID) {
		console.log('\nType of remove: ' + typeof(userID));
		console.log('\nType of remove: ' + typeof(66) + '\n');

		if (typeof userID != 'number') {
			console.log('NOT AN INT, fixing!');
			userID = parseInt(userID);
		}

		const character = this.get(userID);

		if (!character) {
			console.log('Character::remove, no character to remove?');
			return;
		}

		//const successfullLogout = await this.logoutCharacter(character.id);

		//if (successfullLogout) {
			try {
				console.log('Character::remove, saving');
				await this.save(character.userID);
			} catch (err) {
				this.Server.onError(err);
			}

			this.Server.socketFacade.dispatchToRoom(character.getSessionID(), {
				type: CHARACTER_LEFT_SERVER,
				payload: character.userID,
			});
			console.log('Character::remove, left server: ' + character.name);

			this.managedCharacters = this.managedCharacters.filter((obj) => obj.userID !== userID);
			console.log('Character::remove, remove character: ' + character.userID);

			/*
			const derpa = Object.keys(this.characters).length;

			for (let i = 0; i < derpa; i++) {
				console.log('Manage::Characters:   ' + Object.entries(this.characters)[i]);
			}
			*/
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
			},
			//raw: true
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
			},
			//raw: true
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
		console.log('Get online');
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
				console.log('Character::saveAll, saving all!');
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

		console.log('\nType of save: ' + typeof(userID));
		console.log('\nType of save: ' + typeof(66) + '\n');

		if (typeof userID != 'number') {
			console.log('NOT AN INT, fixing!');
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

		console.log('Character::dbSave, return save!');
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
			console.log('Character::joinedServer, no action!');
			return details;
		}

		console.log('Character::joinedServer, return details!');
		return joinedServer(details);
	}

	removeFromServer(position, character) {
		const playersOnServer = this.locations[`${position.map}_${position.x}_${position.y}_${position.z}`];
		console.log('Character::removeFromServer, removing from server.');

		if (playersOnServer) {
			const i = playersOnServer.findIndex((char) => char.userID === character.userID);

			if (i !== -1) {
				playersOnServer.splice(i, 1);
			}
		}
	}

	addToServer(position, character) {
		const location = `${position.map}_${position.x}_${position.y}_${position.z}`;

		console.log('Character::addToServer, add to server.');

		if (!this.locations[location]) {
			console.log('Character::addToServer, setting location.');
			this.locations[location] = [];
		}

		if (this.locations[location].findIndex((char) => char.userID === character.userID) !== -1) {
			console.log('Character::addToServer, already in list.');
			return;
		}

		this.locations[location].push(character);
	}

	getServerData() {
		console.log('Character::getServerData');
		return {
			players: this.getOnline(),
		};
	}
}
