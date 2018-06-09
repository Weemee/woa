import moment from 'moment';

export default (sequelize, DataTypes) =>
{
	const CharacterUnlockedFunctions = sequelize.define('characterUnlockedFunctions',
	{
		charID:
		{
			type: DataTypes.INTEGER,
		},
		fuel:
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

	CharacterUnlockedFunctions.beforeCreate(async function(characterUnlockedFunctions) {
		characterUnlockedFunctions.updatedAt = moment().format('ddd, D MMM YYYY H:mm:ss [GMT]');
	});

	return CharacterUnlockedFunctions;
}
