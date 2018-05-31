import moment from 'moment';

module.exports = (sequelize, DataTypes) =>
{
	const CharacterResources = sequelize.define('characterResources',
	{
		charID:
		{
			type: DataTypes.INTEGER,
		},
		hydrogen:
		{
			type: DataTypes.JSON,
			defaultValue: {},
		},
		helium:
		{
			type: DataTypes.JSON,
			defaultValue: {},
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

	CharacterResources.beforeCreate(async function(characterResources, options) {
		characterResources.updatedAt = moment().format('ddd, D MMM YYYY H:mm:ss [GMT]');
	});

	return CharacterResources;
}
