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
			defaultValue: '',
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

	CharacterObject.associate = (model) => {
		CharacterObject.hasOne(model.characterStats, {
			as: 'stats',
			foreignKey: 'charID',
		});

		CharacterObject.hasOne(model.characterLevels, {
			as: 'levels',
			foreignKey: 'charID',
		});

		CharacterObject.hasOne(model.characterLocation, {
			as: 'location',
			foreignKey: 'charID',
		});

		CharacterObject.hasOne(model.characterResources, {
			as: 'resources',
			foreignKey: 'charID',
		});

		CharacterObject.hasOne(model.characterModifiers, {
			as: 'modifiers',
			foreignKey: 'charID',
		});

		CharacterObject.hasOne(model.characterTalents, {
			as: 'talents',
			foreignKey: 'charID',
		});

		CharacterObject.hasOne(model.characterActions, {
			as: 'actions',
			foreignKey: 'charID',
		});

		CharacterObject.hasOne(model.characterUnlockedBuildings, {
			as: 'unlockedBuildings',
			foreignKey: 'charID',
		});

		CharacterObject.hasOne(model.characterUnlockedElements, {
			as: 'unlockedElements',
			foreignKey: 'charID',
		});

		CharacterObject.hasOne(model.characterUnlockedFunctions, {
			as: 'unlockedFunctions',
			foreignKey: 'charID',
		});

		CharacterObject.hasOne(model.characterUnlockedResearch, {
			as: 'unlockedResearch',
			foreignKey: 'charID',
		});
	};
	
	return CharacterObject;
}
