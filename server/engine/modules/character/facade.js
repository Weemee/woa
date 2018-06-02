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

import db from 'libs/db';
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
			const managedCharacters = await db.characterObject.findAll({
				where:
				{
					userID:
					{
						[db.Op.like]: [socket.account.userID]
					}
				},
				include: [
					{
						model: db.characterStats,
						as: 'stats',
					},
					{
						model: db.characterLevels,
						as: 'levels',
					},
					{
						model: db.characterLocation,
						as: 'location',
					},
					{
						model: db.characterResources,
						as: 'resources',
					},
					{
						model: db.characterResearch,
						as: 'research',
					},
					{
						model: db.characterTalents,
						as: 'talents',
					},
					{
						model: db.characterUnlocks,
						as: 'unlocks',
					}
				]
			}).then(async(result) =>
			{
				return result;
			}).catch(err => {
				if(err) {
					return err;
				}
			});

			if(managedCharacters.length <= 0) {
				console.log('Empty block array: ',managedCharacters);
				this.Server.socketFacade.dispatchToSocket(socket, {
					type: CHARACTER_LIST,
					payload: managedCharacters.map((obj) => {
						return {
							emtpy: true,
						};
					}),
				});
			}
			else {
				this.Server.socketFacade.dispatchToSocket(socket, {
					type: CHARACTER_LIST,
					payload: managedCharacters.map((obj) => {

						return {
							charID: obj.id,
							name: obj.name,
							stats: obj.stats,
							levels: obj.levels,
							location: obj.location,
							resources: obj.resources,
							research: obj.research,
							talents: obj.talents,
							unlocks: obj.unlocks,
						};
					}),
				});
			}
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

	async firstLogin(character) {
		console.log('This character is new! Generating penises... ID: ', character.id,'\n');

		if(!character.spec) {
			console.log('You have no spec, generating...');
		}

		//Check stats
		console.log('Generating stats...');
		const stats = await this.databaseRowExist(character.id, 'characterStats');
		if(!stats) {
			console.log('- No row in stats, generating...');
		} else {
			console.log('- Found in stats, next...');
		}

		//Check levels
		console.log('Generating levels...');
		const levels = await this.databaseRowExist(character.id, 'characterLevels');
		if(!levels) {
			console.log('- No row in levels, generating...');
		} else {
			console.log('- Found in levels, next...');
		}

		//Check location
		console.log('Generating location...');
		const location = await this.databaseRowExist(character.id, 'characterLocation');
		if(!location) {
			console.log('- No row in location, generating...');
		} else {
			console.log('- Found in location, next...');
		}

		//Check resources
		console.log('Generating resources...');
		const resources = await this.databaseRowExist(character.id, 'characterResources');
		if(!resources) {
			console.log('- No row in resources, generating...');
		} else {
			console.log('- Found in resources, next...');
		}

		//Check research
		console.log('Generating research...');
		const research = await this.databaseRowExist(character.id, 'characterResearch');
		if(!research) {
			console.log('- No row in research, generating...');
		} else {
			console.log('- Found in research, next...');
		}

		//Check talents
		console.log('Generating talents...');
		const talents = await this.databaseRowExist(character.id, 'characterTalents');
		if(!talents) {
			console.log('- No row in talents, generating...');
		} else {
			console.log('- Found in talents, next...');
		}

		//Check unlocks
		console.log('Generating unlocks...');
		const unlocks = await this.databaseRowExist(character.id, 'characterUnlocks');
		if(!unlocks) {
			console.log('- No row in unlocks, generating...');
		} else {
			console.log('- Found in unlocks, next...');
		}

		character.firstLogin(stats, levels, location, resources, research, talents, unlocks);
		console.log(character);

		await this.manage(character);
	}

	async databaseRowExist(charID, table) {
		if(table === 'characterStats') {
			const rowExist = await db.characterStats.findOne({
				where:
				{
					charID:
					{
						[db.Op.like]: [charID]
					},
				}
			}).catch(err => {
				if (err) {
					return '- Error in stats -';
				}
			});
			return rowExist;
		}

		if(table === 'characterLevels') {
			const rowExist = await db.characterLevels.findOne({
				where:
				{
					charID:
					{
						[db.Op.like]: [charID]
					},
				}
			}).catch(err => {
				if (err) {
					return '- Error in levels -';
				}
			});
			return rowExist;
		}

		if(table === 'characterLocation') {
			const rowExist = await db.characterLocation.findOne({
				where:
				{
					charID:
					{
						[db.Op.like]: [charID]
					},
				}
			}).catch(err => {
				if (err) {
					return '- Error in location -';
				}
			});
			return rowExist;
		}

		if(table === 'characterResources') {
			const rowExist = await db.characterResources.findOne({
				where:
				{
					charID:
					{
						[db.Op.like]: [charID]
					},
				}
			}).catch(err => {
				if (err) {
					return '- Error in resources -';
				}
			});
			return rowExist;
		}

		if(table === 'characterResearch') {
			const rowExist = await db.characterResearch.findOne({
				where:
				{
					charID:
					{
						[db.Op.like]: [charID]
					},
				}
			}).catch(err => {
				if (err) {
					return '- Error in research -';
				}
			});
			return rowExist;
		}

		if(table === 'characterTalents') {
			const rowExist = await db.characterTalents.findOne({
				where:
				{
					charID:
					{
						[db.Op.like]: [charID]
					},
				}
			}).catch(err => {
				if (err) {
					return '- Error in talents -';
				}
			});
			return rowExist;
		}

		if(table === 'characterUnlocks') {
			const rowExist = await db.characterUnlocks.findOne({
				where:
				{
					charID:
					{
						[db.Op.like]: [charID]
					},
				}
			}).catch(err => {
				if (err) {
					return '- Error in unlocks -';
				}
			});
			return rowExist;
		}
	}

	async manage(character, isNew = false) {
		const wasLoggedIn = this.Server.socketFacade.clearTimer(character);
		const existingCharacter = this.managedCharacters.find((obj) => obj.userID === character.userID);
		const isLoggedIn = character.loggedIn;

		if (wasLoggedIn && existingCharacter) {
			await this.remove(character.userID);
		}

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

	getOnline() {
		return this.managedCharacters.map((character) => ({
				name: character.name,
				userID: character.userID,
			})
		);
	}

	async load(userID, characterName) {
		const character = await this.databaseLoad(parseInt(userID), characterName);
		if (character === null) {
			return null;
			}

		const newCharacter = new Character(this.Server, character);

		return newCharacter;
	}

	async databaseLoad(userID, characterName) {
		try {
		const newCharacter = await db.characterObject.findOne({
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
					nameLowerCase:
					{
						[db.Op.like]: [characterName.toLowerCase()]
					}
				}],
			},
			include: [
				{
					model: db.characterStats,
					as: 'stats',
				},
				{
					model: db.characterLevels,
					as: 'levels',
				},
				{
					model: db.characterLocation,
					as: 'location',
				},
				{
					model: db.characterResources,
					as: 'resources',
				},
				{
					model: db.characterResearch,
					as: 'research',
				},
				{
					model: db.characterTalents,
					as: 'talents',
				},
				{
					model: db.characterUnlocks,
					as: 'unlocks',
				}
			]
		}).then (result => {

			return result;
		}).catch(err => {
			if (err) {
				return 'Error load character.';
			}
		});
		return newCharacter;
		}
		catch (err) {
			this.Server.onError(err);
		}
	}

	async edit(userID, characterName, newName) {
		const nameFormat = /^[\u00C0-\u017Fa-zA-Z'][\u00C0-\u017Fa-zA-Z-' ]+[\u00C0-\u017Fa-zA-Z']?$/g;

		if(!nameFormat.test(newName)) {
			return 'regex';
		}

		const editedCharacter = await this.databaseEdit(userID, characterName, newName);

		if(!editedCharacter) {
			return false;
		}

		return editedCharacter;
	}

	async databaseEdit(userID, characterName, newName) {
		userID = parseInt(userID);
		const checkEdit = await db.characterObject.findOne({
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
					nameLowerCase:
					{
						[db.Op.like]: [characterName.toLowerCase()]
					}
				}]
			}
		}).then(result => {
			const checkReserved = db.accountReservedNames.findOne({
				where:
				{
					name:
					{
						[db.Op.like]: [characterName]
					}
				}
			}).catch(err => {
				if(err) {
					return 'Error reserved names.';
				}
			});

			if(checkReserved) {
				return 'reserved';
			}

			return result.update({
				name: newName,
				nameLowerCase: newName.toLowerCase(),
			}).catch(err => {
				if(err) {
					return err;
				}
			});
		}).catch(err => {
			if(err) {
				return err;
			}
		});

		return checkEdit;
	}

	async delete(userID, characterName) {
		const characterObject = await this.databaseDeleteCharacter(userID, characterName);
		if(!characterObject) 
		{
			return false;
		}

		return characterObject;
	}


	async databaseDeleteCharacter(userID, characterName) {
		userID = parseInt(userID);
		const checkDelete = await db.characterObject.findOne({
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
		}).then(result => {
			return result.destroy({
				force: true,
			});
		}).catch(err => {
			if(err) {
				return;
			}
		});
		return checkDelete;
	}

	async create(userID, characterName, characterSpec) {
		//Move this check to input::facade, since multiple names will be checked
		const nameFormat = /^[\u00C0-\u017Fa-zA-Z][\u00C0-\u017Fa-zA-Z]+[\u00C0-\u017Fa-zA-Z]?$/g;
		
		if(!nameFormat.test(characterName)) {
			return 'Only letters allowed!';
		}

		const character = await this.databaseCreate(userID, characterName, characterSpec);
		
		if(!character) {
			return;
		}

		if(character === 'reserved') {
			return character;
		}

		const newCharacter = new Character(this.Server, character);

		return newCharacter;
	}

	async databaseCreate(userID, characterName, characterSpec) {
		//Find and count all, check if you have 5 already.
		const checkLimit = await db.characterObject.count({
			where:
			{
				userID:
				{
					[db.Op.like]: [userID]
				}
			}
		}).catch(err => {
			if(err) {
				return 'Error count characters.';
			}
		});

		if(checkLimit < 5) {
			const checkReserved = await db.accountReservedNames.findOne({
				where:
				{
					name:
					{
						[db.Op.like]: [characterName]
					}
				}
			}).catch(err => {
				if(err) {
					return 'Error reserved names.';
				}
			});

			if(checkReserved) {
				return 'reserved';
			}
			else {
				const newCharacter = await db.characterObject.create({
					userID: userID,
					name: characterName,
					spec: characterSpec,
					stats: {
						status: 'offline',
					},
					levels: {
	
					},
					location: {
	
					},
					resources: {
						
					},
					research: {
	
					},
					talents: {
	
					},
					unlocks: {
	
					},
				},
				{
					include: [
						{
							model: db.characterStats,
							as: 'stats',
						},
						{
							model: db.characterLevels,
							as: 'levels',
						},
						{
							model: db.characterLocation,
							as: 'location',
						},
						{
							model: db.characterResources,
							as: 'resources',
						},
						{
							model: db.characterResearch,
							as: 'research',
						},
						{
							model: db.characterTalents,
							as: 'talents',
						},
						{
							model: db.characterUnlocks,
							as: 'unlocks',
						},
					],
				}).catch(err => {
					if(err) {
						return err;
					}
				});
				return newCharacter;
			}
		}
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
			servers: this.Server.serverMapFacade.getList(),
			players: this.getOnline(),
		};
	}
}
