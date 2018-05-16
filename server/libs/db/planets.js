import moment from 'moment';
import uuid from 'uuid/v4';
import bcrypt from 'bcrypt';

module.exports = (sequelize, DataTypes) =>
{
	const Planet = sequelize.define('planets',
	{
		solarsystemID:
		{
			type: DataTypes.INTEGER,
		},
		name:
		{
			type: DataTypes.STRING,
		},
		mass:
		{
			type: DataTypes.INTEGER,
		},
		temperature:
		{
			type: DataTypes.INTEGER,
		},
		radius:
		{
			type: DataTypes.INTEGER,
		},
		distanceToStar:
		{
			type: DataTypes.INTEGER,
		},
		type:
		{
			type: DataTypes.STRING,
		},
		selfRotation:
		{
			type: DataTypes.INTEGER,
		},
		starRotation:
		{
			type: DataTypes.INTEGER,
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

	return Planet;
}
