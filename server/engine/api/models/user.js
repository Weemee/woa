import moment from 'moment';
import uuid from 'uuid/v4';
import bcrypt from 'bcrypt';
import config from 'config/security';

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
		keyToken:
		{
			type: DataTypes.STRING,
		},
		accountLevel:
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
		freezeTableName: true
	});

	//External hooks
	User.beforeCreate(async function (user, options) {
		user.password = await bcrypt.hash(user.password, config.passwordSecurity.rounds);
	});

	User.beforeSave(async function(user, options) {
		user.updatedAt = moment().format('ddd, D MMM YYYY H:mm:ss [GMT]');

		if(!user.createdAt) {
			user.createdAt = moment().format('ddd, D MMM YYYY H:mm:ss [GMT]');
		}

		if(!user.sessionToken) {
			user.sessionToken = uuid();
		}
	});

	User.verifyHash = function(string, password) {
		return bcrypt.compare(string, password);
	}

	return User;
}
