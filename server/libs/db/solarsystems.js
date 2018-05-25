import moment from 'moment';
import uuid from 'uuid/v4';
import bcrypt from 'bcrypt';

module.exports = (sequelize, DataTypes) =>
{
	const Star = sequelize.define('stars',
	{
		solarsystemID:
		{
			type: DataTypes.INTEGER,
		}
	});

	const Planet = sequelize.define('planets',
	{
		solarsystemID:
		{
			type: DataTypes.INTEGER,
		}
	});

	const Solarsystem = sequelize.define('solarsystems',
	{
		galaxyID:
		{
			type: DataTypes.INTEGER,
		},
		name:
		{
			type: DataTypes.STRING,
		},
		gridSizeX:
		{
			type: DataTypes.INTEGER,
			defaultValue: 100000,
		},
		gridSizeY:
		{
			type: DataTypes.INTEGER,
			defaultValue: 100000,
		},
		gridSizeZ:
		{
			type: DataTypes.INTEGER,
			defaultValue: 100000,
		},
		ownedBy:
		{
			type: DataTypes.STRING,
			defaultValue: 'system',
		},
		discoveredBy:
		{
			type: DataTypes.STRING,
			defaultValue: 'undiscovered',
		},
		createdBy:
		{
			type: DataTypes.STRING,
			defaultValue: 'system',
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

	Solarsystem.hasOne(Star);
	Solarsystem.hasMany(Planet);
	Star.belongsTo(Solarsystem, {foreignKey: 'solarsystemID', targetKey: 'id'});

	return Solarsystem;
}
