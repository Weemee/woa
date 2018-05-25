import moment from 'moment';
import uuid from 'uuid/v4';
import bcrypt from 'bcrypt';

module.exports = (sequelize, DataTypes) =>
{
	const Resources = sequelize.define('resources',
	{
		charID:
		{
			type: DataTypes.STRING,
		},
		hydrogen:
		{
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
		helium:
		{
			type: DataTypes.INTEGER,
			defaultValue: 0,
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

	Resources.beforeCreate(async function(resources, options) {
		resources.updatedAt = moment().format('ddd, D MMM YYYY H:mm:ss [GMT]');
	});

	return Resources;
}
