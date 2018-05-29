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
	};
	
	return CharacterObject;
}
