import moment from 'moment';

module.exports = (sequelize, DataTypes) =>
{
	const CharacterLevels = sequelize.define('characterLevels',
	{
		charID:
		{
			type: DataTypes.INTEGER,
		},
		exploration:
		{
			type: DataTypes.JSON,
			defaultValue: {},
		},
		science:
		{
			type: DataTypes.JSON,
			defaultValue: {},
		},
		engineering:
		{
			type: DataTypes.JSON,
			defaultValue: {},
		},
		collection:
		{
			type: DataTypes.JSON,
			defaultValue: {},
		},
		automation:
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

	CharacterLevels.beforeCreate(async function(characterLevels, options) {
		characterLevels.updatedAt = moment().format('ddd, D MMM YYYY H:mm:ss [GMT]');
	});

	return CharacterLevels;
}
