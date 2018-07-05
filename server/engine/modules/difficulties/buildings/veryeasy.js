export default {
	researchlab: {
		name: 'Research lab',
		description: 'Allows you to research things. Not the best lab, since it\'s made out of hydrogen and helium, so watch out for explosions and laughter.',
		type: 'crafting',
		subtype: 'building',
		stats: {
			unique: true,
			cost: {
				hydrogen: 30,
				helium: 30,
			},
			time: 15,
			researchTime: 60,
		},
		upgradeable: true,
		upgrades: {
			next: {
				costExp: 1.14,
				researchTimeExp: 0.94,
			},
			max: false,
		},
	},
	storage: {
		name: 'Storage',
		description: 'Increase your maximum storage capacity',
		type: 'crafting',
		subtype: 'building',
		stats: {
			unique: false,
			cost: false,
			divider: 2,
			time: 10,
			maxMult: 2,
		},
		upgradeable: false,
	},
}