export default (sequelize, DataTypes) =>
{
	const ServerGalaxy = sequelize.define('serverGalaxies',
	{
		serverInterstellarID:
		{
			type: DataTypes.INTEGER,
		},
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
		ownedBy:
		{
			type: DataTypes.STRING,
			defaultValue: 'system',
		},
		discoveredBy:
		{
			type: DataTypes.STRING,
			defaultValue: 'undiscovered',
		},
		createdBy:
		{
			type: DataTypes.STRING,
			defaultValue: 'system',
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

	ServerGalaxy.a = [
		'solarsystems',
	];

	ServerGalaxy.associate = (model) => {
		for(let i = 0; i < ServerGalaxy.a.length; i++) {
			ServerGalaxy.hasOne(model['server' + ServerGalaxy.a[i].charAt(0).toUpperCase() + ServerGalaxy.a[i].slice(1)], {
				as: ServerGalaxy.a[i],
				foreignKey: 'serverGalaxyID',
			});
		}
	};

	return ServerGalaxy;
}
