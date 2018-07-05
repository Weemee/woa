import config from './config';

export function cacheGet(index) {
	try {
		let cache = window.localStorage.getItem(index);

		if (!cache) {
			throw new Error('Not found.');
		}

		cache = JSON.parse(cache);

		if (cache.expire && cache.expire < new Date().getTime() / 1000) {
			throw new Error('Cache expired.');
		}

		return cache.data;
	} catch (err) {
		return null;
	}
}

export function cacheSet(index, data, expire = null) {
	expire = config.caching[index] || expire;

	let storeValue = {
		expire: expire ? ((new Date().getTime() / 1000) + expire) : null,
		data,
	};

	window.localStorage.setItem(index, JSON.stringify(storeValue));
}

export function getMessage(inputMessages, pref = '') {
	return Object.keys(inputMessages).reduce((messages, index) => {
		let a = inputMessages[index];
		let prefIndex = pref ? `${pref}.${index}` : index;

		if(typeof a === 'string') {
			messages[prefIndex] = a;
		} else {
			Object.assign(messages, getMessage(a, prefIndex));
		}

		return messages;
	}, {});
}
