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
					type: 'error',
				},
			});
		}
		else if(newCharacter === 'Only letters allowed!') {
			return Server.socketFacade.dispatchToSocket(socket, {
				type: SET_NOTES,
				payload: {
					message: newCharacter,
					type: 'error',
				},
			});
		}
		else {
			Server.socketFacade.dispatchToSocket(socket, {
				type: CHARACTER_CREATE_SUCCESS,
				payload: {
					character: newCharacter.exportToClient(),
					type: 'success',
				},
			});
			return Server.socketFacade.dispatchToSocket(socket, {
				type: SET_NOTES,
				payload: {
					message: 'Successfully created character!',
					type: 'success',
				},
			});
		}
	} catch (err) {
		if(err.code === 11000) {
			return Server.socketFacade.dispatchToSocket(socket, {
				type: SET_NOTES,
				payload: {
					message: 'That character name is already taken.',
					type: 'error',
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
		const deleteCharacter = await Server.characterFacade.delete(socket.account.userID, characterToDelete.name);

		if(!deleteCharacter) {
			return Server.socketFacade.dispatchToSocket(socket, {
				type: SET_NOTES,
				payload: {
					message: 'Could not delete character!',
					type: 'error',
				},
			});
		}
		else {
			Server.characterFacade.getCharacterList(socket);
			return Server.socketFacade.dispatchToSocket(socket, {
				type: SET_NOTES,
				payload: {
					message: `Successfully deleted ${characterToDelete.name}!`,
					type: 'success',
				},
			});
		}
	} catch (err) {
		Server.onError(err, socket);
	}
}

async function inputEditCharacter(socket, character, input, params, inputObject, Server) {
	const characterToEdit = params[0];
	const newName = params[1];

	try {
		const editCharacter = await Server.characterFacade.edit(socket.account.userID, characterToEdit.name, newName);

		if(editCharacter === 'regex') {
			return Server.socketFacade.dispatchToSocket(socket, {
				type: SET_NOTES,
				payload: {
					message: 'Only letters allowed!',
					type: 'error',
				},
			});
		}
		
		if(!editCharacter) {
			return Server.socketFacade.dispatchToSocket(socket, {
				type: SET_NOTES,
				payload: {
					message: 'Could not edit character!',
					type: 'error',
				},
			});
		}
		else {
			Server.characterFacade.getCharacterList(socket);
			return Server.socketFacade.dispatchToSocket(socket, {
				type: SET_NOTES,
				payload: {
					message: `Successfully edited ${characterToEdit.name} to ${editCharacter.name}!`,
					type: 'success',
				},
			});
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
				rules: 'required|minimumlength:3|maximumlength:32',
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
	{
		input: 'editcharacter',
		aliases: [],
		params: [
			{
				name: 'Name',
				rules: 'required|character',
			},
			{
				name: 'New name',
				rules: 'required|minimumlength:3|maximumlength:32',
			},
		],
		onServerInput: false,
		description: 'Edit character',
		method: inputEditCharacter,
	},
];
