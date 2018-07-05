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

	ThemeObject.a = [
		'buttonHover',
		'buttons',
		'containers',
		'headers',
	];

	ThemeObject.associate = (model) => {
		for(let i = 0; i < ThemeObject.a.length; i++) {
			ThemeObject.hasOne(model['theme' + ThemeObject.a[i].charAt(0).toUpperCase() + ThemeObject.a[i].slice(1)], {
				as: ThemeObject.a[i],
				foreignKey: 'themeID',
				onDelete: 'CASCADE',
			});
		}
	};

	return ThemeObject;
}
