export function parsedJsonData(pjd) {
	return JSON.parse(JSON.stringify(pjd));
}

export function serializeObjectInArray(list, prop = 'name', constant) {
	if (constant === null || constant === undefined) {
		return undefined;
	}

	return [...list].sort((x, y) => {
		if (x[prop] < y[prop]) {
			return -1;
		}

		if (x[prop] > y[prop]) {
			return 1;
		}

		return 0;
	}).find((obj) => {
		if (typeof obj[prop] != 'string') {
			return false;
		}

		return obj[prop].toLowerCase().indexOf(constant) === 0;
	});
}
