import moment from 'moment';

export default (sequelize, DataTypes) =>
{
	const ThemeContainers = sequelize.define('themeContainers',
	{
		themeID:
		{
			type: DataTypes.INTEGER,
		},
		textColor:
		{
			type: DataTypes.STRING,
		},
		backgroundColor:
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

	ThemeContainers.beforeCreate(async function(themeContainers) {
		themeContainers.updatedAt = moment().format('ddd, D MMM YYYY H:mm:ss [GMT]');
	});

	return ThemeContainers;
}
