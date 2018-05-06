import {
	CHARACTER_LOGIN,
	CHARACTER_CREATE_ERROR,
	CHARACTER_CREATE_SUCCESS,
} from 'libs/constants';

async function inputCreateCharacter(socket, character, input, params, inputObject, Server) {
	let name = params[0];

	try{
		const newCharacter = await Server.characterFacade.create(socket.user.userID, name);

		Server.socketFacade.dispatchToSocket(socket, {
			type: CHARACTER_CREATE_SUCCESS,
			payload: {
				character: newCharacter.exportToClient(),
			},
		});

	} catch (err) {
		if(err.code === 11000) {
			return Server.socketFacade.dispatchToSocket(socket, {
				type: CHARACTER_CREATE_ERROR,
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
	await Server.socketFacade.logoutOutSession(socket, socket.user.userID);

	try {

		await Server.characterFacade.manage(characterToLoad);

		Server.socketFacade.dispatchToSocket(socket, {
			type: CHARACTER_LOGIN,
			payload: {
				character: characterToLoad.exportToClient(),
				serverData: Server.characterFacade.getServerData(),
			},
		});

		socket.join('server');
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
];
