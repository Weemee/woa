import BuildingList from './buildinglist';
import BuildingInputs from './input';
import Building from './object';

export default class BuildingsFacade {
	constructor(Server) {
		this.Server = Server;

		this.templates = {};
	}

	init() {
		this.Server.inputFacade.registerFacade(BuildingInputs);
		this.Server.log.info('BuildingsFacade::constructor loaded');
	}

	getList() {
		return this.templates;
	}

	getBuilding(item) {
		return this.templates[item];
	}

	getBuildingTime(item) {
		return this.templates[item].stats.time;
	}

	loadList(diff) {
		for(const cat in BuildingList) {
			if(cat === diff) {
				this.templates = new Building(null, BuildingList[cat]);
			}
		}
	}
}