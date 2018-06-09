export default (sequelize, DataTypes) =>
{
	const ServerSolarsystem = sequelize.define('serverSolarsystems',
	{
		serverGalaxyID:
		{
			type: DataTypes.INTEGER,
		}
	});

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

	ServerGalaxy.hasMany(ServerSolarsystem);
	ServerSolarsystem.belongsTo(ServerGalaxy, {foreignKey: 'serverGalaxyID', targetKey: 'id'});

	return ServerGalaxy;
}
