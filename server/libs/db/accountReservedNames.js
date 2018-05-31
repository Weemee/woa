import moment from 'moment';

module.exports = (sequelize, DataTypes) =>
{
	const AccountReservedNames = sequelize.define('accountReservedNames',
	{
		userID:
		{
			type: DataTypes.INTEGER,
		},
		name:
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

	AccountReservedNames.beforeCreate(async function(accountReservedNames, options) {
		accountReservedNames.updatedAt = moment().format('ddd, D MMM YYYY H:mm:ss [GMT]');
	});

	return AccountReservedNames;
}
