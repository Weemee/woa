import moment from 'moment';

export default (sequelize, DataTypes) => {
	const CharacterStats = sequelize.define('characterStats', {
		charID: {
			type: DataTypes.INTEGER,
		},
		firstLogin: {
			type: DataTypes.BOOLEAN,
		},
		status: {
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

	CharacterStats.beforeCreate(async function (characterStats, options) {
		characterStats.updatedAt = moment().format('ddd, D MMM YYYY H:mm:ss [GMT]');
	});

	return CharacterStats;
}
