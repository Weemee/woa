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
		instanceMethods: {
			comparePassword: function(comp, cb) {
				cb('penis');
			}
		},
		hooks: {
			beforeCreate: async function(user, options) {
				console.log('Show me your: ');
				if(this.sessionToken === null) {
					console.log('What about sessionToken generator?');
					this.sessionToken = uuid();
				}
			}
		}
	});

	User.beforeCreate(function(user, options) {
		console.log('Is this even triggered');
		if(!user.sessionToken) {
			user.sessionToken = uuid();
			console.log('What about sessionToken: ' + user.sessionToken);
		}
		return user.sessionToken;
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
