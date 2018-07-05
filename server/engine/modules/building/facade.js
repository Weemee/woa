import BuildingInputs from './input';
import Building from './object';

export default class BuildingsFacade {
	constructor(Server) {
		this.Server = Server;

		this.buildingList = {};
		this.templates = [];
	}

	init() {
		this.Server.inputFacade.registerFacade(BuildingInputs);
		this.Server.log.info('BuildingsFacade::constructor loaded');
	}

	getList() {
		return this.templates;
	}

	getBuilding(item) {
		for(let i = 0; i < this.templates.length; i++) {
			if(this.templates[i].object.id === item) {
				return this.templates[i].object;
			}
		}
	}

	getBuildingTime(item) {
		console.log(this.templates[item].stats.time);
		return this.templates[item].stats.time;
	}

	loadList(object) {
		//Fix
		this.templates.push(new Building(null, object));
		console.log(this.templates);
	}
}