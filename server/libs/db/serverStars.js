import moment from 'moment';

module.exports = (sequelize, DataTypes) =>
{
	const ServerStar = sequelize.define('serverStars',
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

	return ServerStar;
}
