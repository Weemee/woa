import {parsedJsonData} from '../../utils';
import {ACCOUNT_INPUT} from 'vars/constants';

export default class InputFacade {
	constructor(Server) {
		this.Server = Server;

		this.Server.log.debug('InputFacade::constructor Loaded');

		this.Server.socketFacade.on('dispatch', this.onDispatch.bind(this));

		this.inputs = {};
	}

	init() {
		this.Server.log.info('InputFacade::constructor loaded');
	}

	registerFacade(inputList) {
		inputList.forEach((obj) => {
			this.register(obj.input, obj);

			if(obj.aliases) {
				obj.aliases.forEach((alias) => {
					this.register(alias, {...obj}, true);
				});
			}
		});
	}

	register(inputName, inputObject, isAlias = false) {
		if(this.inputs[inputName]) {
			return this.Server.log.warning(`The input ${inputName}, is already registered to the method: ${this.inputs[inputName].name}. Registration ignored.`);
		}

		inputObject.isAlias = isAlias;

		this.inputs[inputName] = inputObject;
	}

	async onDispatch(socket, action) {
		if(action.type !== ACCOUNT_INPUT) {
			return;
		}

		if(!action.payload) {
			return;
		}

		
		if(action.payload.constructor === Object && Object.keys(action.payload).length === 0) {
			return;
		}

		const payload = action.payload.toString().trim();

		if(!payload[0]) {
			return;
		}

		let params = this.parseParameters(payload);
		const input = params.shift().toLowerCase();

		if(!this.inputs[input]) {
			return this.Server.eventToSocket(socket, 'error', `Input ${input} is invalid.`);
		}

		const character = this.Server.characterFacade.get(socket.user.userID);

		const onServerInput = typeof this.inputs[input].onServerInput === 'undefined' ? true : this.inputs[input].onServerInput;

		if(!character && onServerInput)
		{
			return;
		}

		try {
			const parsedParams = await this.validate(character, params, this.inputs[input].params, socket);

			if(typeof parsedParams === 'string') {
				this.Server.eventToSocket(socket, 'error', parsedParams);
				return this.Server.eventToSocket(socket, 'multiline', this.getInfo(input));
			}
			return this.inputs[input].method(
				socket,
				character,
				input,
				parsedParams,
				{
					modifiers: this.inputs[input].modifiers ? parsedJsonData(this.inputs[input].modifiers) : null,
					description: this.inputs[input].description,
				},
				this.Server
			);
		} catch (err) {
			this.Server.onError(err, socket);
		}
	}

	//Parse inputs
	parseParameters(parString) {
		const stringLength = parString.length;
		const params = [];
		let insideString = false;
		let param = '';
		let char;

		for(let i = 0; i < stringLength; i++) {
			char = parString[i];

			if(char == ' ' && !insideString) {
				params.push(param);
				param = '';
			} else {
				if(char == '"') {
					insideString = !insideString;
				}

				param += char;
			}
		}

		if(param.length) {
			params.push(param);
		}

		return params;
	}

	//Strip from "
	stripEncapsulation(param) {
		if(param[0] === '"') {
			param = param.substring(1, param.length - 1);
		}

		if(param[param.length -1] === '"') {
			param = param.substring(0, param.length -2);
		}

		return param;
	}

	async validate(character, msgPars, inputPars, socket) {
		//If no input defined, abbrechen!
		if(!inputPars) {
			return[];
		}

		//Bereiten params so they match
		msgPars = msgPars.slice(0, inputPars.length -1).concat(msgPars.slice(inputPars.length -1).join(' '));

		//Loop params
		for(let i = 0; i < inputPars.length; i++) {
			let param = inputPars[i];

			msgPars[i] = this.stripEncapsulation(msgPars[i]);

			//Kind of selfexplaining, Teilt potential rules
			if(param.rules.length) {
				let rules = param.rules.toLowerCase().split('|');

				//Confirm it has params
				if(!msgPars[i] && !rules.includes('required')){
					break;
				}

				//Loop msgPar for rules
				for(let j = 0; j < rules.length; j++)
				{
					let rule = rules[j];

					//Fetch msgPar
					let msgPar = msgPars[i];
					//Temp msgPar
					let temp = msgPar;

					rule = rule.split(':').concat([null]);

					switch(rule[0]) {
						case 'required':
							if(typeof msgPar === 'undefined' || !msgPar) {
								return `Missing param: ${param.name}`;
							}
						break;

						case 'minimumlength':
							if(msgPar.length < parseInt(rule[1], 10)) {
								return `${param.name} must be at least ${rule[1]} chars`;
							}
						break;

						case 'maximumlength':
							if(msgPar.length > parseInt(rule[1], 10)) {
								return `${param.name} exceeds ${rule[1]} chars`;
							}
						break;

						case 'character':
							temp = await this.Server.characterFacade.load(socket.user.userID, msgPar.toLowerCase());
							//404
							if(!temp) {
								return `No character named ${param.name} found.`;
							}
						break;

						case 'player':
					};

					msgPars[i] = temp;
				}
			}
		}
		return msgPars;
	}

	getInfo(input) {
		const message = 'getInfo from input';

		return message;
	}
}