import moment from 'moment';
import uuid from 'uuid/v4';
import bcrypt from 'bcrypt';

module.exports = (sequelize, DataTypes) =>
{
	const Characters = sequelize.define('characters',
	{
		userID:
		{
			type: DataTypes.STRING,
		},
		name:
		{
			type: DataTypes.STRING,
		},
		nameLowerCase:
		{
			type: DataTypes.STRING,
		},
		spec:
		{
			type: DataTypes.STRING,
		},
		stats:
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

	Characters.beforeCreate(async function(characters, options) {
		characters.updatedAt = moment().format('ddd, D MMM YYYY H:mm:ss [GMT]');

		if(characters.name) {
			characters.nameLowerCase = characters.name.toLowerCase();
		}
	});

	return Characters;
}
