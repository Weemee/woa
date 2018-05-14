import {
	CHARACTER_LEFT_SERVER,
} from 'libs/constants';

function getXYZ(dir) {
	if (dir.server === 'x') {
		return 'x';
	} else if (dir.server === 'y') {
		return 'y';
	} else if (dir.server === 'z') {
		return 'z';
	}

	return;
}
