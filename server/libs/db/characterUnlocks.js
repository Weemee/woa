import moment from 'moment';

module.exports = (sequelize, DataTypes) =>
{
	const CharacterUnlocks = sequelize.define('characterUnlocks',
	{
		charID:
		{
			type: DataTypes.INTEGER,
		},
		research:
		{
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
		exploration:
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

	CharacterUnlocks.beforeCreate(async function(characterUnlocks, options) {
		characterUnlocks.updatedAt = moment().format('ddd, D MMM YYYY H:mm:ss [GMT]');
	});

	return CharacterUnlocks;
}
