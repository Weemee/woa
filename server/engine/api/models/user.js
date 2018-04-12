import moment from 'moment';
import uuid from 'uuid/v4';
import bcrypt from 'bcrypt';

module.exports = (sequelize, DataTypes) =>
{
	const User = sequelize.define('user',
	{
		usr:
		{
			type: DataTypes.STRING,
		},
		email:
		{
			type: DataTypes.STRING,
		},
		password:
		{
			type: DataTypes.STRING,
		},
		validated:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: false
		},
		validationToken:
		{
			type: DataTypes.STRING,
		},
		sessionToken:
		{
			type: DataTypes.UUID,
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

	User.beforeSave('user', async function() {
		this.updatedAt = moment().format('ddd, D MMM YYYY H:mm:ss [GMT]');

		if(!this.sessionToken) {
			this.sessionToken = uuid();
		}
	});

	User.verifyPassword = function(string) {
		return string;
	};
	
	return User;
}