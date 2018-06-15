import moment from 'moment';

export default (sequelize, DataTypes) =>
{
	const CharacterBuildings = sequelize.define('characterBuildings',
	{
		charID:
		{
			type: DataTypes.INTEGER,
		},
		storage:
		{
			type: DataTypes.JSON,
		},
		researchlab:
		{
			type: DataTypes.JSON,
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

	CharacterBuildings.beforeCreate(async function(characterBuildings) {
		characterBuildings.updatedAt = moment().format('ddd, D MMM YYYY H:mm:ss [GMT]');
	});

	return CharacterBuildings;
}
