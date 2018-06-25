export default class Research {
	constructor(Server, researchData, modifiers = {}) {
		Object.assign(this,
			researchData
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

	research(obj) {

	}
}