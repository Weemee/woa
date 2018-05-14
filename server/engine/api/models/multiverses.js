import moment from 'moment';
import uuid from 'uuid/v4';
import bcrypt from 'bcrypt';

module.exports = (sequelize, DataTypes) =>
{
	const Multiverse = sequelize.define('multiverses',
	{
		name:
		{
			type: DataTypes.STRING,
		},
		gridSizeX:
		{
			type: DataTypes.INTEGER,
		},
		gridSizeY:
		{
			type: DataTypes.INTEGER,
		},
		gridSizeZ:
		{
			type: DataTypes.INTEGER,
		},
	},
	{
		freezeTableName: true,
	});

	return Multiverse;
}
