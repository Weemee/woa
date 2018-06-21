function inputRemoveBuilding(socket, character, input, params, inputObject, Server) {
	let buildingID = params[0];
	console.log('\nRemove building:',buildingID);
	character.removeFromBuildingsQueue(buildingID);
	Server.characterFacade.updateClient(character.userID);
}

function inputAddBuilding(socket, character, input, params, inputObject, Server) {
	let buildingID = params[0];
	console.log('\nAdd building:',buildingID);
	character.addToBuildingsQueue(buildingID);
	Server.characterFacade.updateClient(character.userID);
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
				name: 'Building name',
				rules: 'required|building:name',
			}
		],
		description: 'derp',
		method: inputAddBuilding,
	},
]