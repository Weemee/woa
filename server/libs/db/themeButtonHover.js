import moment from 'moment';

export default (sequelize, DataTypes) =>
{
	const ThemeButtonHover = sequelize.define('themeButtonHover',
	{
		themeID:
		{
			type: DataTypes.INTEGER,
		},
		textColor:
		{
			type: DataTypes.STRING,
		},
		borderColor:
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

	ThemeButtonHover.beforeCreate(async function(themeButtonHover) {
		themeButtonHover.updatedAt = moment().format('ddd, D MMM YYYY H:mm:ss [GMT]');
	});

	return ThemeButtonHover;
}
