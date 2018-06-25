import moment from 'moment';

export default (sequelize, DataTypes) =>
{
	const CharacterResearch = sequelize.define('characterResearch',
	{
		charID:
		{
			type: DataTypes.INTEGER,
		},
		fusion:
		{
			type: DataTypes.JSON,
			defaultValue: {
				owned: 0,
				max: 100,
			},
		},
		lithium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				complete: false,
				progress: false,
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

	CharacterResearch.beforeCreate(async function(characterResearch) {
		characterResearch.updatedAt = moment().format('ddd, D MMM YYYY H:mm:ss [GMT]');
	});

	return CharacterResearch;
}
