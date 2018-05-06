require('babel-core/register');
require('babel-polyfill');

import path from 'path';
import {execSync} from 'child_process';
import fs from 'fs';
import crypto from 'crypto';
import Logger from '../engine/modules/log';

const pathToRoot = path.join(__dirname, '../..');
const log = new Logger({
	level: 'info',
	debugFile: `${pathToRoot}/logs/debug.log`,
	infoFile: `${pathToRoot}/logs/info.log`,
	warnFile: `${pathToRoot}/logs/warn.log`,
	errorFile: `${pathToRoot}/logs/error.log`,
});

//Check .env file
if (!fs.existsSync(`${pathToRoot}/.env`)) {
	log.warn('File .env missing, creating...');
	execSync(`cp -n ${pathToRoot}/libs/scripts/.env.temp ${pathToRoot}/`);
} else {
	log.info('Found .env file, next...');
}

//Check config dir
log.info('Creating missing conf files if needed');
if (!fs.existsSync(`${pathToRoot}/libs/conf`)) {
	fs.mkdir(`${pathToRoot}/libs/conf`);
}

try {
	execSync(`cp -Rn ${pathToRoot}/libs/scripts/temp/conf/* ${pathToRoot}/lib/conf`);
} catch (err) {
	log.error(err);
}

//Create sign key
try {
	log.warn('Creating new JWT/Token signing key')
	const confPath = `${pathToRoot}/libs/conf/protocol.js`;
	let confData = fs.readFileSync(confPath, {encoding: 'utf8'});

	const key = crypto.randomBytes(32).toString('hex');
	confData = confData.replace('\'PROTOCOL_SIGNING_SECRET\', \'\'', `\'PROTOCOL_SIGNING_SECRET\', \'${key}\'`);

	fs.writeFileSync(confPath, confDa);
} catch (err) {
	log.error(err);
}
