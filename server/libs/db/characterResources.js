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
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
		helium:
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
		freezeTableName: true,
	});

	CharacterResources.beforeCreate(async function(characterResources, options) {
		characterResources.updatedAt = moment().format('ddd, D MMM YYYY H:mm:ss [GMT]');
	});

	return CharacterResources;
}
