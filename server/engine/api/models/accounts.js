import moment from 'moment';
import uuid from 'uuid/v4';
import bcrypt from 'bcrypt';
import config from 'config/security';

module.exports = (sequelize, DataTypes) =>
{
	const Account = sequelize.define('accounts',
	{
		account:
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
	Account.beforeCreate(async function (account, options) {
		account.password = await bcrypt.hash(account.password, config.passwordSecurity.rounds);
	});

	Account.beforeSave(async function(account, options) {
		account.updatedAt = moment().format('ddd, D MMM YYYY H:mm:ss [GMT]');

		if(!account.createdAt) {
			account.createdAt = moment().format('ddd, D MMM YYYY H:mm:ss [GMT]');
		}

		if(!account.sessionToken) {
			account.sessionToken = uuid();
		}
	});

	Account.verifyHash = function(string, password) {
		return bcrypt.compare(string, password);
	}

	return Account;
}
