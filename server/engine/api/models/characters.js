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
		nameLowercase:
		{
			type: DataTypes.STRING,
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

	Characters.beforeSave('characters', async function() {
		this.updatedAt = moment().format('ddd, D MMM YYYY H:mm:ss [GMT]');

		if(this.name) {
			this.nameLowercase = this.name.toLowerCase();
		}
	});

	return Characters;
}
