import moment from 'moment';

module.exports = (sequelize, DataTypes) =>
{
	const CharacterResearch = sequelize.define('characterResearch',
	{
		charID:
		{
			type: DataTypes.INTEGER,
		},
		fusion:
		{
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
		production:
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

	CharacterResearch.beforeCreate(async function(characterResearch, options) {
		characterResearch.updatedAt = moment().format('ddd, D MMM YYYY H:mm:ss [GMT]');
	});

	return CharacterResearch;
}
