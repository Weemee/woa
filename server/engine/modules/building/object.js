export default class Building {
	constructor(Server, buildingData, modifiers = {}) {
		Object.assign(this,
			buildingData
		);
		this.Server = Server;
	}

	exportToClient() {
		return {
			description: this.description,
			name: this.name,
			type: this.type,
			subtype: this.subtype,
			stats: {...this.stats},
			hasUpgrades: (this.upgradeable ? {...this.upgrades} : false)
		};
	}

	build(obj) {

	}
}