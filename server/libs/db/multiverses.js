import moment from 'moment';
import uuid from 'uuid/v4';
import bcrypt from 'bcrypt';

module.exports = (sequelize, DataTypes) =>
{
	const Universe = sequelize.define('universes',
	{
		multiverseID:
		{
			type: DataTypes.INTEGER,
		}
	});

	const Multiverse = sequelize.define('multiverses',
	{
		name:
		{
			type: DataTypes.STRING,
		},
		gridSizeX:
		{
			type: DataTypes.INTEGER,
			defaultValue: 10,
		},
		gridSizeY:
		{
			type: DataTypes.INTEGER,
			defaultValue: 10,
		},
		gridSizeZ:
		{
			type: DataTypes.INTEGER,
			defaultValue: 10,
		},
		createdAt:
		{
			type: DataTypes.DATE,
		},
		updatedAt:
		{
			type: DataTypes.DATE,
		},
	},
	{
		freezeTableName: true,
	});

	Multiverse.hasMany(Universe);
	Universe.belongsTo(Multiverse, {foreignKey: 'multiverseID', targetKey: 'id'});

	return Multiverse;
}
