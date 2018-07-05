export default (sequelize, DataTypes) =>
{
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

	ServerLocalcluster.a = [
		'interstellars',
	];

	ServerLocalcluster.associate = (model) => {
		for(let i = 0; i < ServerLocalcluster.a.length; i++) {
			ServerLocalcluster.hasOne(model['server' + ServerLocalcluster.a[i].charAt(0).toUpperCase() + ServerLocalcluster.a[i].slice(1)], {
				as: ServerLocalcluster.a[i],
				foreignKey: 'serverLocalclusterID',
			});
		}
	};

	return ServerLocalcluster;
}
