import {
	GET_THEME_LIST,
	THEME_LIST,
	SET_THEME,
} from 'libs/constants';

import db from 'libs/db';
import themeInput from './input';
import Theme from './object';

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

		const loadedTheme = await this.loadTheme(socket);

		const theme = await this.loadThemeObject(loadedTheme);
		const newTheme = new Theme(this.Server, theme);

		this.Server.socketFacade.dispatchToSocket(socket, {
			type: SET_THEME,
			payload: newTheme.exportToClient(),
		});

		this.Server.socketFacade.dispatchToSocket(socket, {
			type: THEME_LIST,
			payload: themeList,
		});
	}

	async saveTheme(socket, theme) {
		const updated = await db.accountObject.update({
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

		if(!updated) {
			return;
		}

		const object = await db.themeObject.findOne({
			where:
			{
				name:
				{
					[db.Op.like]: [theme],
				}
			},
			include: [
				{
					model: db.themeButtons,
					as: 'button',
				},
				{
					model: db.themeHeaders,
					as: 'header',
				},
				{
					model: db.themeContainers,
					as: 'container',
				},
				{
					model: db.themeButtonHover,
					as: 'buttonHover',
				},
			],
		}).then(result => {
			return result;
		}).catch(err => {
			return err
		});

		const newTheme = new Theme(this.Server, object);
		return newTheme;
	}

	loadTheme(socket) {
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

	async loadThemeObject(account) {
		try {
			const object = await db.themeObject.findOne({
				where:
				{
					name:
					{
						[db.Op.like]: [account.dataValues.theme],
					}
				},
				include: [
					{
						model: db.themeButtons,
						as: 'button',
					},
					{
						model: db.themeHeaders,
						as: 'header',
					},
					{
						model: db.themeContainers,
						as: 'container',
					},
					{
						model: db.themeButtonHover,
						as: 'buttonHover',
					},
				],
			}).then(result => {
				return result;
			}).catch(err => {
				return err
			});

			return object;
		} catch (err) {
			this.Server.onError(err);
		}
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