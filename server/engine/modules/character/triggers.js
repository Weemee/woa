export default {
	elements: {
		helium: {
			bool: false,
			msg: 'Temp',
			trigger: {
				resources: {
					hydrogen: 15,
					helium: 0,
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