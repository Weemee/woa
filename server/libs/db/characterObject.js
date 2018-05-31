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

	CharacterObject.beforeCreate(async function (characterObject, options) {
		characterObject.updatedAt = moment().format('ddd, D MMM YYYY H:mm:ss [GMT]');
		if (characterObject.name) {
			characterObject.nameLowerCase = characterObject.name.toLowerCase();
		}
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

		CharacterObject.hasOne(model.characterResearch, {
			as: 'research',
			foreignKey: 'charID',
		});

		CharacterObject.hasOne(model.characterTalents, {
			as: 'talents',
			foreignKey: 'charID',
		});

		CharacterObject.hasOne(model.characterUnlocks, {
			as: 'unlocks',
			foreignKey: 'charID',
		});
	};
	
	return CharacterObject;
}