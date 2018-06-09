import uuid from 'uuid/v4';

export default class Character {
	constructor(Server, theme) {
		this.Server = Server;

		this.themeID = uuid();

		Object.assign(this, {
			...theme.dataValues,
		});
	}

	exportToClient() {
		return {
			name: this.name,
			button: this.button.dataValues,
			header: this.header.dataValues,
			buttonHover: this.buttonHover.dataValues,
			container: this.container.dataValues,
		};
	}
}