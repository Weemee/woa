import ResearchList from './researchlist';
import ResearchInputs from './input';
import Research from './object';

export default class ResearchFacade {
	constructor(Server) {
		this.Server = Server;

		this.templates = {};
	}

	init() {
		this.Server.inputFacade.registerFacade(ResearchInputs);
		this.Server.log.info('ResearchFacade::constructor loaded');
	}

	getList() {
		return this.templates;
	}

	getResearch(item) {
		return this.templates[item];
	}

	getResearchTime(item) {
		return this.templates[item].stats.time;
	}

	loadList(diff) {
		for(const cat in ResearchList) {
			if(cat === diff) {
				this.templates = new Research(null, ResearchList[cat]);
			}
		}
	}
}