import moment from 'moment';

export default (sequelize, DataTypes) =>
{
	const ThemeHeaders = sequelize.define('themeHeaders',
	{
		themeID:
		{
			type: DataTypes.INTEGER,
		},
		backgroundColor:
		{
			type: DataTypes.STRING,
		},
		textColor:
		{
			type: DataTypes.STRING,
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

	ThemeHeaders.beforeCreate(async function(themeHeaders) {
		themeHeaders.updatedAt = moment().format('ddd, D MMM YYYY H:mm:ss [GMT]');
	});

	return ThemeHeaders;
}
