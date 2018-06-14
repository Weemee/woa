import moment from 'moment';
import uuid from 'uuid/v4';
import bcrypt from 'bcrypt';
import config from 'config/security';

export default (sequelize, DataTypes) =>
{
	const AccountObject = sequelize.define('accountObject',
	{
		name:
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
			defaultValue: 'DE'
		},
		accountLevel:
		{
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
		lastCharPlayed:
		{
			type: DataTypes.INTEGER,
			defaultValue: null,
		},
		theme:
		{
			type: DataTypes.STRING,
			defaultValue: 'dark',
		},
		language:
		{
			type: DataTypes.STRING,
			defaultValue: 'en-UK',
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

	//External hooks
	AccountObject.beforeCreate(async function (accountObject, options) {
		accountObject.password = await bcrypt.hash(accountObject.password, config.passwordSecurity.rounds);
	});

	AccountObject.beforeSave(async function(accountObject, options) {
		accountObject.updatedAt = moment().format('ddd, D MMM YYYY H:mm:ss [GMT]');

		if(!accountObject.createdAt) {
			accountObject.createdAt = moment().format('ddd, D MMM YYYY H:mm:ss [GMT]');
		}

		if(!accountObject.sessionToken) {
			accountObject.sessionToken = uuid();
		}
	});

	AccountObject.verifyHash = function(string, password) {
		return bcrypt.compare(string, password);
	}

	return AccountObject;
}
