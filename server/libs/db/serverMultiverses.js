export default (sequelize, DataTypes) =>
{
	const ServerUniverse = sequelize.define('serverUniverses',
	{
		serverMultiverseID:
		{
			type: DataTypes.INTEGER,
		}
	});

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

	ServerMultiverse.hasMany(ServerUniverse);
	ServerUniverse.belongsTo(ServerMultiverse, {foreignKey: 'serverMultiverseID', targetKey: 'id'});

	return ServerMultiverse;
}
