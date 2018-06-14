import BuildingList from 'data/buildings.json';
import BuildingInputs from './input';
import Building from './object';

export default class BuildingsFacade {
	constructor(Server) {
		this.Server = Server;

		this.templates = {};
	}

	init() {
		BuildingList.map((buildingData) => {
			this.templates[buildingData.ID] = new Building(null, buildingData);
		});

		this.Server.inputFacade.registerFacade(BuildingInputs);
		this.Server.log.info('BuildingsFacade::constructor loaded');
	}
}