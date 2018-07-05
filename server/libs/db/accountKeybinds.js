import moment from 'moment';

export default (sequelize, DataTypes) =>
{
	const AccountKeybinds = sequelize.define('accountKeybinds',
	{
		userID:
		{
			type: DataTypes.INTEGER,
			unique: true,
		},
		mainMenu:
		{
			type: DataTypes.JSON,
			defaultValue: {
				default: '27',
				preference: '',
			},
		},
		characterInfo:
		{
			type: DataTypes.JSON,
			defaultValue: {
				default: '67',
				preference: '',
			},
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

	AccountKeybinds.beforeSave(async function(accountObject, options) {
		accountKeybinds.updatedAt = moment().format('ddd, D MMM YYYY H:mm:ss [GMT]');

		if(!accountObject.createdAt) {
			accountKeybinds.createdAt = moment().format('ddd, D MMM YYYY H:mm:ss [GMT]');
		}
	});

	return AccountKeybinds;
}
