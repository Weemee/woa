import moment from 'moment';

export default (sequelize, DataTypes) => {
	const DifficultyTriggers = sequelize.define('difficultyTriggers', {
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

	DifficultyTriggers.beforeCreate(async(difficultyTriggers, options) => {
		difficultyTriggers.updatedAt = moment().format('ddd, D MMM YYYY H:mm:ss [GMT]');
		if (difficultyTriggers.name) {
			difficultyTriggers.nameLowerCase = difficultyTriggers.name.toLowerCase();
		}
	});
	
	return DifficultyTriggers;
}
