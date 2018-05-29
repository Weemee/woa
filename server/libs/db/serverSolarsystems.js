import moment from 'moment';

module.exports = (sequelize, DataTypes) =>
{
	const ServerStar = sequelize.define('serverStars',
	{
		serverSolarsystemID:
		{
			type: DataTypes.INTEGER,
		}
	});

	const ServerPlanet = sequelize.define('serverPlanets',
	{
		serverSolarsystemID:
		{
			type: DataTypes.INTEGER,
		}
	});

	const ServerSolarsystem = sequelize.define('serverSolarsystems',
	{
		serverGalaxyID:
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
			defaultValue: 100000,
		},
		gridSizeY:
		{
			type: DataTypes.INTEGER,
			defaultValue: 100000,
		},
		gridSizeZ:
		{
			type: DataTypes.INTEGER,
			defaultValue: 100000,
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

	ServerSolarsystem.hasOne(ServerStar);
	ServerSolarsystem.hasMany(ServerPlanet);
	ServerStar.belongsTo(ServerSolarsystem, {foreignKey: 'serverSolarsystemID', targetKey: 'id'});

	return ServerSolarsystem;
}
