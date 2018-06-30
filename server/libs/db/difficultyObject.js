import moment from 'moment';

export default (sequelize, DataTypes) => {
	const DifficultyObject = sequelize.define('difficultyObject', {
		name: {
			type: DataTypes.STRING,
		},
		loopSpeed: {
			type: DataTypes.FLOAT,
		},
		gatheringMult: {
			type: DataTypes.FLOAT,
		},
		buildingSpeed: {
			type: DataTypes.FLOAT,
		},
		researchSpeed: {
			type: DataTypes.FLOAT,
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

	DifficultyObject.beforeCreate(async(difficultyObject, options) => {
		difficultyObject.updatedAt = moment().format('ddd, D MMM YYYY H:mm:ss [GMT]');
		if (difficultyObject.name) {
			difficultyObject.nameLowerCase = difficultyObject.name.toLowerCase();
		}
	});

	DifficultyObject.a = [
		'triggers',
		'buildings',
	];

	DifficultyObject.associate = (model) => {
		for(let i = 0; i < DifficultyObject.a.length; i++) {
			DifficultyObject.hasOne(model['difficulty' + DifficultyObject.a[i].charAt(0).toUpperCase() + DifficultyObject.a[i].slice(1)], {
				as: DifficultyObject.a[i],
				foreignKey: 'diffID',
				onDelete: 'CASCADE',
			});
		}
	};
	
	return DifficultyObject;
}
