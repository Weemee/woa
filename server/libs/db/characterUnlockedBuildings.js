import moment from 'moment';

export default (sequelize, DataTypes) =>
{
	const CharacterUnlockedBuildings = sequelize.define('characterUnlockedBuildings',
	{
		charID:
		{
			type: DataTypes.INTEGER,
		},
		storage:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		researchlab:
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

	CharacterUnlockedBuildings.beforeCreate(async function(characterUnlockedBuildings) {
		characterUnlockedBuildings.updatedAt = moment().format('ddd, D MMM YYYY H:mm:ss [GMT]');
	});

	return CharacterUnlockedBuildings;
}
