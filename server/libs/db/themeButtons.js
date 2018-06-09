import moment from 'moment';

export default (sequelize, DataTypes) =>
{
	const ThemeButtons = sequelize.define('themeButtons',
	{
		themeID:
		{
			type: DataTypes.INTEGER,
		},
		width:
		{
			type: DataTypes.STRING,
		},
		cursorType:
		{
			type: DataTypes.STRING,
		},
		borderRadius:
		{
			type: DataTypes.STRING,
		},
		padding:
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

	ThemeButtons.beforeCreate(async function(themeButtons) {
		themeButtons.updatedAt = moment().format('ddd, D MMM YYYY H:mm:ss [GMT]');
	});

	return ThemeButtons;
}
