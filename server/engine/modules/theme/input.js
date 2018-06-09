import {
	SET_THEME,
} from 'libs/constants';

async function inputChangeTheme(socket, theme, input, params, inputObject, Server) {
	const themeToLoad = params[0];

	try {
		const newTheme = await Server.themeFacade.saveTheme(socket, themeToLoad);

		Server.socketFacade.dispatchToSocket(socket, {
			type: SET_THEME,
			payload: newTheme.exportToClient(),
		});
	} catch (err) {
		Server.onError(err, socket);
	}
}

export default [
	{
		input: 'changetheme',
		aliases: [],
		params: [
			{
				name: 'Name',
				rules: 'required',
			},
		],
		onServerInput: false,
		description: 'Change account theme',
		method: inputChangeTheme,
	}
]