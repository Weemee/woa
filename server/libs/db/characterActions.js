import moment from 'moment';

export default (sequelize, DataTypes) =>
{
	const CharacterActions = sequelize.define('characterActions',
	{
		charID:
		{
			type: DataTypes.INTEGER,
		},
		current:
		{
			type: DataTypes.JSON,
			defaultValue: {status: null, source: null},
		},
		buildingQueue:
		{
			type: DataTypes.JSON,
			defaultValue: [],
		},
		researching:
		{
			type: DataTypes.JSON,
			defaultValue: [],
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
