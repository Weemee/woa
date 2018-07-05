import moment from 'moment';

export default (sequelize, DataTypes) =>
{
	const Specializations = sequelize.define('specializations',
	{
		name: {
			type: DataTypes.STRING,
		},
		description: {
			type: DataTypes.TEXT,
		},
		talentPoints: {
			type: DataTypes.INTEGER,
		},
		talentLock: {
			type: DataTypes.STRING,
		},
		createdAt: {
			type: DataTypes.DATE,
		},
		updatedAt: {
			type: DataTypes.DATE,
		},
	},
	{
		freezeTableName: true,
		null: false,
	});

	Specializations.beforeCreate(async function(specializations) {
		specializations.updatedAt = moment().format('ddd, D MMM YYYY H:mm:ss [GMT]');
	});

	return Specializations;
}
