import moment from 'moment';
import uuid from 'uuid/v4';
import bcrypt from 'bcrypt';

module.exports = (sequelize, DataTypes) =>
{
	const Galaxy = sequelize.define('galaxies',
	{
		interstellarID:
		{
			type: DataTypes.INTEGER,
		}
	});

	const Interstellar = sequelize.define('interstellars',
	{
		localclusterID:
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

	Interstellar.hasMany(Galaxy);
	Galaxy.belongsTo(Interstellar, {foreignKey: 'interstellarID', targetKey: 'id'});

	return Interstellar;
}
