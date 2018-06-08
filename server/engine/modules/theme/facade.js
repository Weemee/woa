import {
	GET_THEME_LIST,
	THEME_LIST,
	SET_THEME,
} from 'libs/constants';

import db from 'libs/db';
import themeInput from './input';

export default class ThemeFacade {
	constructor(Server) {
		this.Server = Server;

		this.themes = {};

		this.Server.socketFacade.on('dispatch', this.onDispatch.bind(this));
	}

	init() {
		this.Server.inputFacade.registerFacade(themeInput);
		this.Server.log.info('ThemeFacade::constructor loaded');
	}

	onDispatch(socket, action) {
		switch(action.type) {
			case GET_THEME_LIST:
				return this.sendThemeList(socket, action);
		}
		
		return null;
	}

	async sendThemeList(socket) {
		const themeList = await this.getThemeList();

		const currentTheme = await this.getCurrentTheme(socket);

		this.Server.socketFacade.dispatchToSocket(socket, {
			type: SET_THEME,
			payload: currentTheme.dataValues.theme,
		});

		this.Server.socketFacade.dispatchToSocket(socket, {
			type: THEME_LIST,
			payload: themeList,
		});
	}

	saveTheme(socket, theme) {
		db.accountObject.update({
			theme: theme,
		},
		{
			where:
			{
				id:
				{
					[db.Op.like]: [socket.account.userID]
				}
			}
		}).then(result => {
			return result;
		}).catch(err => {
			return err;
		});
	}

	getCurrentTheme(socket) {
		const account = db.accountObject.findOne({
			where:
			{
				id:
				{
					[db.Op.like]: [socket.account.userID]
				}
			}
		}).catch(err => {
			console.log(err);
			return(err);
		});

		if(!account) {
			return;
		}

		return account;
	}

	getThemeList() {
		const themes = db.themeObject.findAll({

		}).catch(err => {
			console.log(err);
			return err;
		});

		if(!themes) {
			return;
		}

		return themes;
	}
}