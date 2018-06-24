import uuid from 'uuid/v4';

export default class Theme {
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
			button: this.buttons.dataValues,
			header: this.headers.dataValues,
			buttonHover: this.buttonHover.dataValues,
			container: this.containers.dataValues,
		};
	}
}