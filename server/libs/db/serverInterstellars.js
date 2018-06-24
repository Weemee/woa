export default (sequelize, DataTypes) =>
{
	const ServerInterstellar = sequelize.define('serverInterstellars',
	{
		serverLocalclusterID:
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

	ServerInterstellar.a = [
		'galaxies',
	];

	ServerInterstellar.associate = (model) => {
		for(let i = 0; i < ServerInterstellar.a.length; i++) {
			ServerInterstellar.hasOne(model['server' + ServerInterstellar.a[i].charAt(0).toUpperCase() + ServerInterstellar.a[i].slice(1)], {
				as: ServerInterstellar.a[i],
				foreignKey: 'serverInterstellarID',
			});
		}
	};

	return ServerInterstellar;
}
