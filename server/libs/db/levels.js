import moment from 'moment';
import uuid from 'uuid/v4';
import bcrypt from 'bcrypt';

module.exports = (sequelize, DataTypes) =>
{
	const Levels = sequelize.define('levels',
	{
		charID:
		{
			type: DataTypes.STRING,
		},
		exploration:
		{
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
		science:
		{
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
		engineering:
		{
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
		collection:
		{
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
		automation:
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

	Levels.beforeCreate(async function(levels, options) {
		levels.updatedAt = moment().format('ddd, D MMM YYYY H:mm:ss [GMT]');
	});

	return Levels;
}
