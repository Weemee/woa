function inputRemoveResearch(socket, character, input, params, inputObject, Server) {
	let researchID = params[0];
	console.log('\nRemove research:',researchID);
	character.removeFromResearchQueue(researchID);
	Server.characterFacade.updateClient(character.userID);
}

function inputAddResearch(socket, character, input, params, inputObject, Server) {
	let researchID = params[0];
	console.log('\nAdd research:',researchID);
	character.addToResearchQueue(researchID);
	Server.characterFacade.updateClient(character.userID);
}

export default [
	{
		input: 'removeresearch',
		aliases: [],
		params: [
			{
				name: 'Research name',
				rules: 'required|building:name',
			}
		],
		description: 'derp',
		method: inputRemoveResearch,
	},
	{
		input: 'addresearch',
		aliases: [],
		params: [
			{
				name: 'Research name',
				rules: 'required|building:name',
			}
		],
		description: 'derp',
		method: inputAddResearch,
	},
]