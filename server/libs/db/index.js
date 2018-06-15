import Sequelize from 'sequelize';
import fs from 'fs';
import path from 'path';
import config from 'libs/conf/database';

const basename = path.basename(__filename);
const db = {};

const sequelize = new Sequelize(config.databaseTypes.mysql);

fs.readdirSync(__dirname).filter(file => {
	return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
}).forEach(file => {
	const model = sequelize['import'](path.join(__dirname, file));
	console.log('Loaded db: ', model.name);
	db[model.name] = model;
});

Object.keys(db).forEach((modelName) => {
	if('associate' in db[modelName]) {
		db[modelName].associate(db);
	}
});

db.include = (obj) => {
	if(typeof(obj) === 'string') {
		return db[obj].a;
	}

	if(typeof(obj) === 'object') {
		let result = [];
		for(let i = 0; i < obj.length; i++) {
			let object = {
				model: db['character' + obj[i].charAt(0).toUpperCase() + obj[i].slice(1)],
				as: obj[i],
			}
			result.push(object);
		}
		return result;
	}
};

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Op = sequelize.Op;

export default db;
