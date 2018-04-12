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
	db[model.name] = model;
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Op = sequelize.Op;

module.exports = db;
