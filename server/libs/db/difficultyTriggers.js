import moment from 'moment';

export default (sequelize, DataTypes) => {
	const DifficultyTriggers = sequelize.define('difficultyTriggers', {
		diffID: {
			type: DataTypes.INTEGER,
		},
		name: {
			type: DataTypes.STRING,
		},
		category: {
			type: DataTypes.STRING,
		},
		msg: {
			type: DataTypes.STRING,
		},
		trigger: {
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

	DifficultyTriggers.beforeCreate(async(difficultyTriggers) => {
		difficultyTriggers.updatedAt = moment().format('ddd, D MMM YYYY H:mm:ss [GMT]');
	});
	
	return DifficultyTriggers;
}
