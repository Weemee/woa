export default {
	elements: {
		helium: {
			bool: false,
			msg: 'Temp',
			trigger: {
				resources: {
					hydrogen: 5,
				},
			},
		},
	},
	buildings: {
		storage: {
			bool: false,
			msg: 'Temp',
			trigger: {
				resources: {
					hydrogen: 20,
					helium: 20,
				},
			},
		},
	},
	research: {
		fusion: {
			bool: false,
			msg: 'Temp',
			trigger: {
				resources: {
					hydrogen: 30,
					helium: 40,
				},
			},
		},
	},
	functions: {
		location: {
			bool: false,
			msg: 'Temp',
			trigger: {
				resources: {
					hydrogen: 200,
					helium: 120,
				},
			},
		},
		talents: {
			bool: false,
			msg: 'Temp',
			trigger: {
				resources: {
					hydrogen: 20,
					helium: 20,
				},
			},
		},
		research: {
			bool: false,
			msg: 'Temp',
			trigger: {
				resources: {
					hydrogen: 5,
					helium: 5,
				},
			},
		},
		fuel: {
			bool: false,
			msg: 'Temp',
			trigger: {
				resources: {
					hydrogen: 200,
					helium: 120,
				},
			},
		}
	},
};