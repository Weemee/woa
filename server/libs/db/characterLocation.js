import moment from 'moment';

module.exports = (sequelize, DataTypes) =>
{
	const CharacterLocation = sequelize.define('characterLocation',
	{
		charID:
		{
			type: DataTypes.INTEGER,
		},
		multiverse:
		{
			type: DataTypes.JSON,
			defaultValue: {},
		},
		universe:
		{
			type: DataTypes.JSON,
			defaultValue: {},
		},
		supercluster:
		{
			type: DataTypes.JSON,
			defaultValue: {},
		},
		localcluster:
		{
			type: DataTypes.JSON,
			defaultValue: {},
		},
		galaxy:
		{
			type: DataTypes.JSON,
			defaultValue: {},
		},
		interstellar:
		{
			type: DataTypes.JSON,
			defaultValue: {},
		},
		solarsystem:
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

	CharacterLocation.beforeCreate(async function(characterLocation, options) {
		characterLocation.updatedAt = moment().format('ddd, D MMM YYYY H:mm:ss [GMT]');
	});

	return CharacterLocation;
}
