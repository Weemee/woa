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
};

export default Config;
