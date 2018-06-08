import moment from 'moment';

export default (sequelize, DataTypes) =>
{
	const ThemeValues = sequelize.define('themeValues',
	{
		themeID:
		{
			type: DataTypes.INTEGER,
		},
		container:
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

	ThemeValues.beforeCreate(async function(themeValues) {
		themeValues.updatedAt = moment().format('ddd, D MMM YYYY H:mm:ss [GMT]');
	});

	return ThemeValues;
}
