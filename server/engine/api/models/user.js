import moment from 'moment';
import uuid from 'uuid/v4';
import bcrypt from 'bcrypt';
import config from '../../../config.json';

module.exports = (sequelize, DataTypes) =>
{
	const User = sequelize.define("user",
	{
		usr:
		{
			type: DataTypes.STRING,
		},
		password:
		{
			type: DataTypes.STRING,
		},
		sessionToken:
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
	
	return User;
}