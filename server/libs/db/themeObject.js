import moment from 'moment';

export default (sequelize, DataTypes) =>
{
	const ThemeObject = sequelize.define('themeObject',
	{
		name:
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

	ThemeObject.beforeCreate(async function(themeObject) {
		themeObject.updatedAt = moment().format('ddd, D MMM YYYY H:mm:ss [GMT]');
	});

	ThemeObject.associate = (model) => {
		ThemeObject.hasOne(model.themeButtons, {
			as: 'button',
			foreignKey: 'themeID',
		});

		ThemeObject.hasOne(model.themeButtonHover, {
			as: 'buttonHover',
			foreignKey: 'themeID',
		});

		ThemeObject.hasOne(model.themeHeaders, {
			as: 'header',
			foreignKey: 'themeID',
		});

		ThemeObject.hasOne(model.themeContainers, {
			as: 'container',
			foreignKey: 'themeID',
		});
	}

	return ThemeObject;
}
