import moment from 'moment';

export default (sequelize, DataTypes) =>
{
	const CharacterUnlockedResearch = sequelize.define('characterUnlockedResearch',
	{
		charID:
		{
			type: DataTypes.INTEGER,
		},
		fusion:
		{
			type: DataTypes.BOOLEAN,
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

	CharacterUnlockedResearch.beforeCreate(async function(characterUnlockedResearch) {
		characterUnlockedResearch.updatedAt = moment().format('ddd, D MMM YYYY H:mm:ss [GMT]');
	});

	return CharacterUnlockedResearch;
}
