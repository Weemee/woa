import moment from 'moment';

export default (sequelize, DataTypes) => {
	const CharacterObject = sequelize.define('characterObject', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		userID: {
			type: DataTypes.INTEGER,
		},
		name: {
			type: DataTypes.STRING,
		},
		nameLowerCase: {
			type: DataTypes.STRING,
		},
		spec: {
			type: DataTypes.STRING,
		},
		difficulty: {
			type: DataTypes.TINYINT,
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

	CharacterObject.beforeCreate(async(characterObject, options) => {
		characterObject.updatedAt = moment().format('ddd, D MMM YYYY H:mm:ss [GMT]');
		if (characterObject.name) {
			characterObject.nameLowerCase = characterObject.name.toLowerCase();
		}
	});

	CharacterObject.beforeUpdate(async(characterObject, options) => {
		characterObject.updatedAt = moment().format('ddd, D MMM YYYY H:mm:ss [GMT]');
	});

	CharacterObject.a = [
		'stats',
		'levels',
		'location',
		'resources',
		'buildings',
		'talents',
		'actions',
		'unlockedBuildings',
		'unlockedElements',
		'unlockedFunctions',
		'unlockedResearch'
	];

	CharacterObject.associate = (model) => {
		for(let i = 0; i < CharacterObject.a.length; i++) {
			CharacterObject.hasOne(model['character' + CharacterObject.a[i].charAt(0).toUpperCase() + CharacterObject.a[i].slice(1)], {
				as: CharacterObject.a[i],
				foreignKey: 'charID',
				onDelete: 'CASCADE',
			});
		}
	};
	
	return CharacterObject;
}
