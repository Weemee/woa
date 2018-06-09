export default (sequelize, DataTypes) =>
{
	const ServerInterstellar = sequelize.define('serverInterstellars',
	{
		serverLocalclusterID:
		{
			type: DataTypes.INTEGER,
		}
	});

	const ServerLocalcluster = sequelize.define('serverLocalclusters',
	{
		serverSuperclusterID:
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

	ServerLocalcluster.hasMany(ServerInterstellar);
	ServerInterstellar.belongsTo(ServerLocalcluster, {foreignKey: 'serverLocalclusterID', targetKey: 'id'});

	return ServerLocalcluster;
}
