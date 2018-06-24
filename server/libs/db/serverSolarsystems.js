export default (sequelize, DataTypes) =>
{
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

	ServerSolarsystem.a = [
		'stars',
		'planets',
	];

	ServerSolarsystem.associate = (model) => {
		for(let i = 0; i < ServerSolarsystem.a.length; i++) {
			ServerSolarsystem.hasOne(model['server' + ServerSolarsystem.a[i].charAt(0).toUpperCase() + ServerSolarsystem.a[i].slice(1)], {
				as: ServerSolarsystem.a[i],
				foreignKey: 'serverSolarsystemID',
			});
		}
	};

	return ServerSolarsystem;
}
