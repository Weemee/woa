import moment from 'moment';

export default (sequelize, DataTypes) =>
{
	const CharacterModifiers = sequelize.define('characterModifiers',
	{
		charID:
		{
			type: DataTypes.INTEGER,
		},
		speed:
		{
			type: DataTypes.FLOAT,
			defaultValue: 1.00,
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

	CharacterModifiers.beforeCreate(async function(characterModifiers, options) {
		characterModifiers.updatedAt = moment().format('ddd, D MMM YYYY H:mm:ss [GMT]');
	});

	return CharacterModifiers;
}
