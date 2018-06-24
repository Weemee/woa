export default (sequelize, DataTypes) =>
{
	const ServerMultiverse = sequelize.define('serverMultiverses',
	{
		name:
		{
			type: DataTypes.STRING,
		},
		gridSizeX:
		{
			type: DataTypes.INTEGER,
			defaultValue: 10,
		},
		gridSizeY:
		{
			type: DataTypes.INTEGER,
			defaultValue: 10,
		},
		gridSizeZ:
		{
			type: DataTypes.INTEGER,
			defaultValue: 10,
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

	ServerMultiverse.a = [
		'universes',
	];

	ServerMultiverse.associate = (model) => {
		for(let i = 0; i < ServerMultiverse.a.length; i++) {
			ServerMultiverse.hasOne(model['server' + ServerMultiverse.a[i].charAt(0).toUpperCase() + ServerMultiverse.a[i].slice(1)], {
				as: ServerMultiverse.a[i],
				foreignKey: 'serverMultiverseID',
			});
		}
	};

	return ServerMultiverse;
}
