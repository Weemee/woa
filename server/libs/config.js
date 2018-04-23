//Config file

import fs from 'fs';
import path from 'path';

/**
* Check a given config value
*/
export function dotEnv(index, defaultVariable, sep = null) {
	if (typeof process.env[index] !== 'undefined' && process.env[index] !== '') {
		return process.env[index];
	}

	return defaultVariable;
}

export function buildConfig() {
	const configDirectory = path.join(__dirname, '../libs/', 'conf');
	const config = {};

	fs.readdirSync(configDirectory).forEach((file) => {
		if (!file.includes('.js')) {
			console.log('Can not find file');
			return;
		}

		const configResult = require(`${configDirectory}/${file}`);
		config[file.toLowerCase().replace('.js', '')] = configResult.default;
	});

	return config;
}
