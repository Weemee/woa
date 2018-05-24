import {
	CHARACTER_LOGIN,
	SET_NOTES,
	CHARACTER_CREATE_SUCCESS,
} from 'libs/constants';

async function inputCreateCharacter(socket, character, input, params, inputObject, Server) {
	let name = params[0];

	try{
		const newCharacter = await Server.characterFacade.create(socket.account.userID, name);

		if(!newCharacter) {
			return Server.socketFacade.dispatchToSocket(socket, {
				type: SET_NOTES,
				payload: {
					message: 'Character limit reached (maximum five (5))',
				},
			});
		}
		else {
			Server.socketFacade.dispatchToSocket(socket, {
				type: CHARACTER_CREATE_SUCCESS,
				payload: {
					character: newCharacter.exportToClient(),
				},
			});
		}

	} catch (err) {
		if(err.code === 11000) {
			return Server.socketFacade.dispatchToSocket(socket, {
				type: SET_NOTES,
				payload: {
					message: 'That character name is already taken.',
				},
			});
		}
		Server.onError(err, socket);
	}
}

async function inputSelectCharacter(socket, character, input, params, inputObject, Server) {
	const characterToLoad = params[0];
	await Server.socketFacade.logoutOutSession(socket, socket.account.userID);

	try {

		console.log('Character::Input::inputSelectCharacter, character to load: ' + characterToLoad);
		await Server.characterFacade.manage(characterToLoad);

		Server.socketFacade.dispatchToSocket(socket, {
			type: CHARACTER_LOGIN,
			payload: {
				character: characterToLoad.exportToClient(),
				gameData: Server.characterFacade.getServerData(),
			},
		});

		socket.join('server');
	} catch (err) {
		Server.onError(err, socket);
	}
}

async function inputDeleteCharacter(socket, character, input, params, inputObject, Server) {
	const characterToDelete = params[0];
	
	try {
		console.log('Delete character ', characterToDelete.name, '!');
		const deletecharacter = await Server.characterFacade.delete(socket.account.userID, characterToDelete.name);

		if(!deletecharacter) {
			return Server.socketFacade.dispatchToSocket(socket, {
				type: SET_NOTES,
				payload: {
					message: 'Could not delete character!',
				},
			});
		} else {
			Server.characterFacade.getCharacterList(socket);
			//Send notes about successfull character delete
		}
	} catch (err) {
		Server.onError(err, socket);
	}
}

module.exports = [
	{
		input: 'selectcharacter',
		aliases: [],
		params: [
			{
				name: 'Name',
				rules: 'required|character',
			},
		],
		onServerInput: false,
		description: 'Login with character',
		method: inputSelectCharacter,
	},
	{
		input: 'createcharacter',
		aliases: [],
		params: [
			{
				name: 'Character name',
				rules: 'required|minimumlength:4|maximumlength:32',
			},
		],
		onServerInput: false,
		description: 'Create character',
		method: inputCreateCharacter,
	},
	{
		input: 'deletecharacter',
		aliases: [],
		params: [
			{
				name: 'Name',
				rules: 'required|character',
			},
		],
		onServerInput: false,
		description: 'Delete character',
		method: inputDeleteCharacter,
	},
];
