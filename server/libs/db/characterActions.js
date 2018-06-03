import moment from 'moment';

module.exports = (sequelize, DataTypes) =>
{
	const CharacterActions = sequelize.define('characterActions',
	{
		charID:
		{
			type: DataTypes.INTEGER,
		},
		generating:
		{
			type: DataTypes.STRING,
			defaultValue: 'slacking',
		},
		buildingQueue:
		{
			type: DataTypes.JSON,
			defaultValue: [],
		},
		researching:
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

	CharacterActions.beforeCreate(async function(characterActions, options) {
		characterActions.updatedAt = moment().format('ddd, D MMM YYYY H:mm:ss [GMT]');
	});

	return CharacterActions;
}
