function inputAdminAdd(socket, character, input, params, inputObject, Server) {
	let typeObject = params[0];
	let type = params[1];
	let service = params[2];

	if(service === 'add')
	{
		Server.adminFacade['add' + type](typeObject.toLowerCase(), type);
	} else {
		Server.adminFacade['edit' + type](typeObject.toLowerCase(), type);
	}
}

export default [
	{
		input: 'adminadd',
		aliases: [],
		params: [
			{
				name: 'Name',
				rules: 'required',
			},
			{
				name: 'Type',
				rules: 'required',
			},
			{
				name: 'Service',
				rules: 'required',
			}
		],
		description: 'derp',
		method: inputAdminAdd,
	},
]