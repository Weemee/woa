export default (sequelize, DataTypes) =>
{
	const ServerPlanet = sequelize.define('serverPlanets',
	{
		serverSolarsystemID:
		{
			type: DataTypes.INTEGER,
		},
		name:
		{
			type: DataTypes.STRING,
		},
		mass:
		{
			type: DataTypes.INTEGER,
		},
		temperature:
		{
			type: DataTypes.INTEGER,
		},
		radius:
		{
			type: DataTypes.INTEGER,
		},
		distanceToStar:
		{
			type: DataTypes.INTEGER,
		},
		type:
		{
			type: DataTypes.STRING,
		},
		selfRotation:
		{
			type: DataTypes.INTEGER,
		},
		starRotation:
		{
			type: DataTypes.INTEGER,
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

	return ServerPlanet;
}
