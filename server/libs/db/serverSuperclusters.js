export default (sequelize, DataTypes) =>
{
	const ServerSupercluster = sequelize.define('serverSuperclusters',
	{
		serverUniverseID:
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

	ServerSupercluster.a = [
		'localclusters',
	];

	ServerSupercluster.associate = (model) => {
		for(let i = 0; i < ServerSupercluster.a.length; i++) {
			ServerSupercluster.hasOne(model['server' + ServerSupercluster.a[i].charAt(0).toUpperCase() + ServerSupercluster.a[i].slice(1)], {
				as: ServerSupercluster.a[i],
				foreignKey: 'serverSuperclusterID',
			});
		}
	};

	return ServerSupercluster;
}
