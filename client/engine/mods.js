import config from './config';

export function cacheGet(key) {
    try {
        let cache = window.localStorage.getItem(key);

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

export function cacheSet(key, data, expire = null) {
    expire = config.caching[key] || expire;

    let storeValue = {
        expire: expire ? ((new Date().getTime() / 1000) + expire) : null,
        data,
    };

    window.localStorage.setItem(key, JSON.stringify(storeValue));
}
