import moment from 'moment';

export default (sequelize, DataTypes) => {
	const DifficultyBuildings = sequelize.define('difficultyBuildings', {
		diffID: {
			type: DataTypes.INTEGER,
		},
		object: {
			type: DataTypes.JSON,
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

	DifficultyBuildings.beforeCreate(async(difficultyBuildings) => {
		difficultyBuildings.updatedAt = moment().format('ddd, D MMM YYYY H:mm:ss [GMT]');
	});
	
	return DifficultyBuildings;
}
