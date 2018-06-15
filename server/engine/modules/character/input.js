import {
	CHARACTER_LOGIN,
	SET_NOTES,
	CHARACTER_CREATE_SUCCESS,
	CLEAR_LOADING,
} from 'libs/constants';

async function inputCreateCharacter(socket, character, input, params, inputObject, Server) {
	let name = params[0];
	let spec = params[1];
	let difficulty = params[2];
	let server = params[3];

	try{
		const newCharacter = await Server.characterFacade.create(socket.account.userID, name, spec, difficulty, server);
		if(!newCharacter) {
			return Server.socketFacade.dispatchToSocket(socket, {
				type: SET_NOTES,
				payload: {
					message: 'Character limit reached (maximum five (5))',
					type: 'error',
				},
			});
		}

		if(newCharacter === 'Only letters allowed!') {
			return Server.socketFacade.dispatchToSocket(socket, {
				type: SET_NOTES,
				payload: {
					message: newCharacter,
					type: 'error',
				},
			});
		}

		if(newCharacter === 'reserved') {
			return Server.socketFacade.dispatchToSocket(socket, {
				type: SET_NOTES,
				payload: {
					message: 'That name is reserved, sorry.',
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
		if(characterToLoad.stats.firstLogin) {
			console.log('\nFirst login: ', characterToLoad.stats.firstLogin, '\n');
			await Server.characterFacade.firstLogin(characterToLoad);
		}
		else {
			await Server.characterFacade.manage(characterToLoad);
		}
		
		Server.socketFacade.dispatchToSocket(socket, {
			type: CLEAR_LOADING,
			payload: null,
		});

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
		console.log('Delete character ', characterToDelete.id, '!');
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
		
		const checkList = await Server.characterFacade.getCharacterList(socket);
		console.log('The list: ', checkList);
		Server.socketFacade.dispatchToSocket(socket, {
			type: SET_NOTES,
			payload: {
				message: `Successfully deleted ${characterToDelete.name}!`,
				type: 'success',
			},
		});
	} catch(err) {
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

		if(editCharacter === 'reserved') {
			return Server.socketFacade.dispatchToSocket(socket, {
				type: SET_NOTES,
				payload: {
					message: 'That name is reserved, sorry.',
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

function inputGenerateResource(socket, character, input, params, inputObject, Server) {
	const resource = params[0];
	console.log(resource);
	character.setGenerating(resource);
}

export default [
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
				name: 'Name',
				rules: 'required|minimumlength:3|maximumlength:32',
			},
			{
				spec: 'Specialization',
				rules: 'required',
			},
			{
				difficulty: 'Difficulty',
				rules: 'required',
			},
			{
				server: 'Server',
				rules: 'required|server',
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
	{
		input: 'generateresource',
		aliases: [],
		params: [
			{
				resource: 'Resource',
				rules: 'required',
			}
		],
		onServerInput: false,
		description: 'Set resource to generate',
		method: inputGenerateResource,
	},
];
