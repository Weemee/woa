import moment from 'moment';

export default (sequelize, DataTypes) =>
{
	const CharacterTalents = sequelize.define('characterTalents',
	{
		charID:
		{
			type: DataTypes.INTEGER,
		},
		production:
		{
			type: DataTypes.JSON,
			defaultValue: {},
		},
		exploration:
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

	CharacterTalents.beforeCreate(async function(characterTalents, options) {
		characterTalents.updatedAt = moment().format('ddd, D MMM YYYY H:mm:ss [GMT]');
	});

	return CharacterTalents;
}
