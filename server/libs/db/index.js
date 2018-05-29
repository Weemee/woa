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
	console.log('\nLoaded db: ', model.name);
	if(model.associate) {
		console.log('\tWith a model association!');
	}
	db[model.name] = model;
});


Object.keys(db).forEach((modelName) => {
	if('associate' in db[modelName]) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Op = sequelize.Op;

export default db;
