import moment from 'moment';
import uuid from 'uuid/v4';
import bcrypt from 'bcrypt';

module.exports = (sequelize, DataTypes) =>
{
	const Location = sequelize.define('location',
	{
		charID:
		{
			type: DataTypes.STRING,
		},
		multiverse:
		{
			type: DataTypes.JSON,
			defaultValue: {},
		},
		universe:
		{
			type: DataTypes.JSON,
			defaultValue: {},
		},
		supercluster:
		{
			type: DataTypes.JSON,
			defaultValue: {},
		},
		localcluster:
		{
			type: DataTypes.JSON,
			defaultValue: {},
		},
		galaxy:
		{
			type: DataTypes.JSON,
			defaultValue: {},
		},
		interstellar:
		{
			type: DataTypes.JSON,
			defaultValue: {},
		},
		solarsystem:
		{
			type: DataTypes.JSON,
			defaultValue: {},
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

	Location.beforeCreate(async function(location, options) {
		location.updatedAt = moment().format('ddd, D MMM YYYY H:mm:ss [GMT]');
	});

	return Location;
}
