import {
	CHARACTER_UPDATE,
} from 'libs/constants';

import adminInput from './input';
import {adminEvent} from '../../actions';

import db from 'libs/db';

export default class AdminFacade {
	constructor(Server) {
		this.Server = Server;

		this.Server.log.debug('AdminFacade::constructor Loaded');
	}

	init() {
		this.Server.inputFacade.registerFacade(adminInput);
		this.Server.log.info('AdminFacade::constructor loaded');
	}

	async addSpecialization(object, type) {
		const test = await this.createSpec(object, 'is a made out of paper! Kukuku...', 5, 'paper');
		if(!test) {
			console.log('\nSomething went wrong...\n', test);
			return;
		}

		this.Server.socketFacade.updateSockets(type);
		this.Server.characterFacade.updateAllClients();

		console.log('Done updating');
		return test;
	}

	async createSpec(name, desc, tp, tl) {
		const newSpec = await db.specializations.create({
			name: name,
			description: desc,
			talentPoints: tp,
			talentLock: tl,
		}).catch(err => {
			console.log(err);
			return err;
		});

		return newSpec;
	}
}