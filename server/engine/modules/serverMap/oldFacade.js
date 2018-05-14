import fs from 'fs';
import {
	SERVER_LIST,
	GET_SERVER_LIST,
	SERVER_DETAILS,
} from 'libs/constants';

import ServerMap from './object';
import serverMapInputs from './inputs';

export default class ServerMapFacade {
	constructor(Server) {
		this.Server = Server;
		this.serverMaps = {};
		this.Server.socketFacade.on('dispatch',
			this.onDispatch.bind(this)
		);
	}

	init() {
		const dir = 'libs/data/servers';
		const mapList = fs.readdirSync(`${dir}`);

		mapList.map((mapName) => {
			if (mapName[0] === '.') {
				return;
			}

			const newPath = `${__dirname}/../../../${dir}/${mapName}`;
			const newDir = `${dir}/${mapName}`;
			let mapData = require(`${newPath}/multiverse`);

			this.serverMaps[mapData.id] = new ServerMap(this.Server, mapData);
			this.serverMaps[mapData.id].loadInstances(newDir, newPath);

			console.log(this.serverMaps[mapData.id].getUniverses());
		});
	}

	onDispatch(socket, action) {
		switch (action.type) {
			case SERVER_GET_LIST:
				return this.dispatchMapList(socket, action);
		}

		return null;
	}

	dispatchMapList() {
		const list = this.getList();

		this.Server.socketFacade.dispatchToSocket(socket, {
			type: SERVER_LIST,
			payload: list,
		});
	}

	getList() {
		const list = {};

		//Add list Object

		return list;
	}
}
