const host = 'localhost || http://yourhost.whatever';

const Config = {
	socket: {
		host: host + ':8082',
	},

	api: {
		host: host + ':8084',
	},

	// Seconds
	caching: {
		strategies: 300,
	},

	version: '0.0.515',
};

export default Config;
