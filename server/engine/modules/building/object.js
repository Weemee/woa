export default class Building {
	constructor(Server, buildingData, modifiers = {}) {
		Object.assign(this, buildingData);
		this.Server = Server;
	}
}