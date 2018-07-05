export default (sequelize, DataTypes) =>
{
	const ServerUniverse = sequelize.define('serverUniverses',
	{
		serverMultiverseID:
		{
			type: DataTypes.INTEGER,
		},
		name:
		{
			type: DataTypes.STRING,
		},
		fullName:
		{
			type: DataTypes.STRING,
		},
		posX:
		{
			type: DataTypes.DOUBLE,
		},
		posY:
		{
			type: DataTypes.DOUBLE,
		},
		posZ:
		{
			type: DataTypes.DOUBLE,
		},
		gridSizeX:
		{
			type: DataTypes.INTEGER,
			defaultValue: 7,
		},
		gridSizeY:
		{
			type: DataTypes.INTEGER,
			defaultValue: 7,
		},
		gridSizeZ:
		{
			type: DataTypes.INTEGER,
			defaultValue: 7,
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
		nulle: false,
	});

	ServerUniverse.a = [
		'superclusters',
	];

	ServerUniverse.associate = (model) => {
		for(let i = 0; i < ServerUniverse.a.length; i++) {
			ServerUniverse.hasOne(model['server' + ServerUniverse.a[i].charAt(0).toUpperCase() + ServerUniverse.a[i].slice(1)], {
				as: ServerUniverse.a[i],
				foreignKey: 'serverUniverseID',
			});
		}
	};
	
	return ServerUniverse;
}
