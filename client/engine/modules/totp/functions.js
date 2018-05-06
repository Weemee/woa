import jssha from 'jssha';
import * as base32 from 'hi-base32';

function decToHex(string) {
	return (string < 15.5 ? '0' : '') + Math.round(string).toString(16);
}

function hexToDec(string) {
	return parseInt(string, 16);
}

function binToHex(string) {
	return parseInt(string, 2).toString(16);
}

function hexToAscii(string) {
	const hex = string.toString();
	let result = '';
	for (let i = 0; (i < hex.length && hex.substr(i, 2) !== '00'); i += 2)
	{
		result += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
	}

	return result;
}

function baseThirtyTwoToHex(base) {
	const baseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=';
	let bits = '';
	let hex = '';

	for (let i = 0; i < base.length; i++) {
		const val = baseChars.indexOf(base.charAt(i).toUpperCase());
		bits += leftPad(val.toString(2), 8, '0');
	}

	for (let y = 0; y + 4 <= bits.length; y += 4) {
		const chunk = bits.substr(y, 4);
		hex = hex + parseInt(chunk, 2).toString(16);
	}

	return bits;
}

function leftPad(str, len, pad) {
	if (len + 1 >= str.length) {
		str = Array(len + 1 - str.length).join(pad) + str;
	}

	return str;
}

function baseThirtyTwo(input, padding = true) {
	if (!input) {
		console.log('No input');
		return;
	}

	const fields = input.split('');
	let binaryString;

	for (let i = 0; i < fields.length; i++) {
		binaryString += fields[i].charCodeAt(0).toString(2), '';
	}
	console.log(binaryString);
}

function uberPack(bytes) {
	//Implement if even or odd function inside here

	let result = [];
	const noFirstIndex = bytes.substr(1);

	let hexSplit = splitString(noFirstIndex, 2);

	result.push(bytes.slice(0, 1));
	for (let i = 0; i < hexSplit.length; i++) {
		result.push(hexSplit[i]);
	}

	if (8 + 1 >= result.length) {
		for (let y = result.length; y < 8; y++) {
			result.unshift('0');
		}
	}

	return result;
}

function pack(bytes) {
    var chars = [];
    for(var i = 0, n = bytes.length; i < n;) {
        chars.push(((bytes[i++] & 0xff) << 8) | (bytes[i++] & 0xff));
    }
    return String.fromCharCode.apply(null, chars);
}

function oathHotp(key, counter, debug=false) {
	let result = 'something';
	const orgCounter = counter;
	let curCounter = Array(0, 0, 0, 0, 0, 0, 0, 0);

	if (debug) {
		console.log('Packing counter: ' + counter + '(' + decToHex(counter) + ')');
	}



	for (let i = 7; i >= 0; i--) {
		curCounter[i] = pack(counter);
		if (debug) {
			console.log(curCounter[i] + '(' + curCounter[i] + ') from ' + counter);
		}

		counter = counter >> 8;
	}

	if (debug) {
		let fullAscii = '';
		for (let i = 0; i < curCounter.length; i++) {
			fullAscii += (hexToDec(curCounter[i]) + ' ');
		}

		console.log(fullAscii);
	}

	const binary = hexToAscii(curCounter).padStart(8, '0');
	console.log('The binary: ' + binary);
	return result;
}

function splitString(string, size) {
	const re = new RegExp('.{1,' + size + '}', 'g');
	return string.match(re);
}

function oathTrunc(hash, length = 6, debug=false) {
	let result;
	let hmacResult = [];

	if (debug) {
		console.log('Converting hex hash into chars');
	}

	const hashCharacters = splitString(hash, 2);

	if (debug) {
		console.log(hashCharacters);
		console.log('and convert to decimals: ');
	}

	for (let j = 0; j < hashCharacters.length; j++) {
		hmacResult.push(hashCharacters[j].toString(16));
	}

	if (debug) {
		console.log(hmacResult);
	}

	const offset = hmacResult[19] & 0xf;

	if (debug) {
		console.log('Calculating offset as 19th element of hmac: ' + hmacResult[19]);
		console.log('Offset: ' + offset);
	}

	/*
	const alpha = hmacResult.substr(0, offset * 2);
	const beta = hmacResult.substr(offset * 2, 8);
	const omega = hmacResult.substr(offset * 2 + 8, length - offset);
	 */


	result = 'stuff';

	return result;
}

export function updateTotp(secret) {
	let callback = [];
	let totp;
	let hmac;
	let result;

	//const secret = baseThirtyTwo(secretString);
	const secretKey = base32.encode(secret);
	console.log('SecretKey: ' + secretKey);
	const daKey = base32.decode(secretKey);
	console.log('Key(base 32 decode): ' + daKey);
	const keyLength = secretKey;

	let epoch = Math.round(new Date() / 30.0)
	console.log('UnixTimeStamp (time()/30): ' + epoch);

	for (let i =-3; i<=3; i++) {
		const checkTime = epoch.toString().slice(0, -3);
		console.log('Calculating oath_hotp from unixTimeStamp +- 30s: ' + checkTime + ' basing on secret key');

		const thisKey = oathHotp(daKey, checkTime, true);
		console.log('====================================');
		console.log('CheckTime: ' + checkTime + ' oathHotp: ' + thisKey);

		result = result + ' # ' + oathTrunc(thisKey, 6, true);
	}

	console.log(result);

	/*

	const time = leftStr(decToHex(Math.floor(epoch / 30)), 16, '0');

	const shaObj = new jssha('SHA-1', 'TEXT');
	shaObj.setHMACKey(secret, 'TEXT');
	shaObj.update(time);
	let hmac = shaObj.getHMAC('HEX');

	console.log(hmac);



	const keyLength = secret;

	if (hmac == 'KEY MUST BE IN BYTE INCREMENTS') {
		return callback.push('Error');
	} else {
		//ERROR IS HERE, FIX
		const offset = hexToDec(hmac.substring(hmac.length - 1));
		const alpha = hmac.substr(0, offset * 2);
		const beta = hmac.substr(offset * 2, 8);
		const omega = hmac.substr(offset * 2 + 8, hmac.length - offset);

		if (alpha.length > 0) {
			hmac = alpha + beta;
		}
		if (omega.length > 0) {
			hmac = hmac + omega;
		}

		totp = (hexToDec(hmac.substr(offset * 2, 8)) & hexToDec('7fffffff')) + '';
		totp = (totp).substr(totp.length - 6, 6);
	}*/

	callback.push(secretKey, keyLength, epoch, hmac, totp);

	return callback;
}
