import {dotEnv} from '../config';

export default {
	databaseType: dotEnv('DATABASE_TYPE', 'mysql'),
	databaseTypes: {
		mysql: {
			port: dotEnv('DATABASE_PORT', 3306),
			username: dotEnv('DATABASE_USERNAME', 'root'),
			password: dotEnv('DATABASE_PASSWORD', 'password'),
			database: dotEnv('DATABASE_TABLE', 'WoA'),
			dialect: dotEnv('DATABASE_DIALECT', 'mysql'),
			freezeTableName: dotEnv('DATABASE_FREEZE_TABLE_NAME', true),
			operatorsAliases: dotEnv('DATASE_OPERATOR_ALIASES', false)
		},
	},
};
