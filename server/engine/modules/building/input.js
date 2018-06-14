function inputRemoveBuilding(socket, character, input, params, inputObject, Server) {

}

function inputAddBuilding(socket, character, input, params, inputObject, Server) {

}

export default [
	{
		input: 'removebuilding',
		aliases: [],
		params: [
			{
				name: 'Building name',
				rules: 'required|building:name',
			}
		],
		description: 'derp',
		method: inputRemoveBuilding,
	},
	{
		input: 'addbuilding',
		aliases: [],
		params: [
			{

			}
		],
		description: 'derp',
		method: inputAddBuilding,
	},
]