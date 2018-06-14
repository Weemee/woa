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
		display:
		{
			type: DataTypes.STRING,
		},
		transition:
		{
			type: DataTypes.STRING,
		},
		border:
		{
			type: DataTypes.STRING,
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
		textTransform:
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
