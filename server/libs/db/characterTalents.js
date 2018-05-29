import moment from 'moment';

module.exports = (sequelize, DataTypes) =>
{
	const CharacterTalents = sequelize.define('characterTalents',
	{
		charID:
		{
			type: DataTypes.INTEGER,
		},
		production:
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

	CharacterTalents.beforeCreate(async function(characterTalents, options) {
		characterTalents.updatedAt = moment().format('ddd, D MMM YYYY H:mm:ss [GMT]');
	});

	return CharacterTalents;
}
