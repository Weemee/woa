const dev = true;
let host = '';

if(dev) {
	host = 'http://localhost';
} else {
	host = 'http://yourOwnHost.com';
}

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

	version: '0.0.491',
};

export default Config;
