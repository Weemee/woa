import moment from 'moment';

export default (sequelize, DataTypes) =>
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
			defaultValue: {
				name: 'ALPHA',
				x: 0,
				y: 0,
				z: 0,
			},
		},
		universe:
		{
			type: DataTypes.JSON,
			defaultValue: {
				name: 'BETA',
				x: 0,
				y: 0,
				z: 0,
			},
		},
		supercluster:
		{
			type: DataTypes.JSON,
			defaultValue: {
				name: 'GAMMA',
				x: 0,
				y: 0,
				z: 0,
			},
		},
		localcluster:
		{
			type: DataTypes.JSON,
			defaultValue: {
				name: 'DELTA',
				x: 0,
				y: 0,
				z: 0,
			},
		},
		galaxy:
		{
			type: DataTypes.JSON,
			defaultValue: {
				name: 'EPSILON',
				x: 0,
				y: 0,
				z: 0,
			},
		},
		interstellar:
		{
			type: DataTypes.JSON,
			defaultValue: {
				name: 'ZETA',
				x: 0,
				y: 0,
				z: 0,
			},
		},
		solarsystem:
		{
			type: DataTypes.JSON,
			defaultValue: {
				name: 'ETA',
				x: 0,
				y: 0,
				z: 0,
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

	CharacterLocation.beforeCreate(async function(characterLocation, options) {
		characterLocation.updatedAt = moment().format('ddd, D MMM YYYY H:mm:ss [GMT]');
	});

	return CharacterLocation;
}
