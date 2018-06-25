import moment from 'moment';

export default (sequelize, DataTypes) => {
	const DifficultyBuildings = sequelize.define('difficultyBuildings', {
		diffID: {
			type: DataTypes.INTEGER,
		},
		name: {
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
	});

	DifficultyBuildings.beforeCreate(async(difficultyBuildings, options) => {
		difficultyBuildings.updatedAt = moment().format('ddd, D MMM YYYY H:mm:ss [GMT]');
		if (difficultyBuildings.name) {
			difficultyBuildings.nameLowerCase = difficultyBuildings.name.toLowerCase();
		}
	});
	
	return DifficultyBuildings;
}
