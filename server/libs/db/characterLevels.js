import moment from 'moment';

export default (sequelize, DataTypes) =>
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
			defaultValue: {
				currentLevel: 0,
				currentXP: 0,
				maxLevel: 100,
				xpToNextLevel: 100,
			},
		},
		science:
		{
			type: DataTypes.JSON,
			defaultValue: {
				currentLevel: 0,
				currentXP: 0,
				maxLevel: 100,
				xpToNextLevel: 100,
			},
		},
		engineering:
		{
			type: DataTypes.JSON,
			defaultValue: {
				currentLevel: 0,
				currentXP: 0,
				maxLevel: 100,
				xpToNextLevel: 100,
			},
		},
		collection:
		{
			type: DataTypes.JSON,
			defaultValue: {
				currentLevel: 0,
				currentXP: 0,
				maxLevel: 100,
				xpToNextLevel: 100,
			},
		},
		automation:
		{
			type: DataTypes.JSON,
			defaultValue: {
				currentLevel: 0,
				currentXP: 0,
				maxLevel: 100,
				xpToNextLevel: 100,
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

	CharacterLevels.beforeCreate(async function(characterLevels, options) {
		characterLevels.updatedAt = moment().format('ddd, D MMM YYYY H:mm:ss [GMT]');
	});

	return CharacterLevels;
}
