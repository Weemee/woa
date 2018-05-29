import moment from 'moment';

module.exports = (sequelize, DataTypes) =>
{
	const ServerSupercluster = sequelize.define('serverSuperclusters',
	{
		serverUniverseID:
		{
			type: DataTypes.INTEGER,
		}
	});

	const ServerUniverse = sequelize.define('serverUniverses',
	{
		id:
		{
			type: DataTypes.INTEGER,
			primaryKey: true,
		},
		serverMultiverseID:
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

	ServerUniverse.hasMany(ServerSupercluster);
	ServerSupercluster.belongsTo(ServerUniverse, {foreignKey: 'serverUniverseID', targetKey: 'id'});

	return ServerUniverse;
}
