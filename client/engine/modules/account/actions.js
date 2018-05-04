import {
	ACCOUNT_DETAILS,
	ACCOUNT_DETAILS_GET,
	ACCOUNT_DETAILS_UPDATE,
	ACCOUNT_DETAILS_DELETE,
} from './types';

export function getAccountDetails(userID, authToken) {
	return {
		type: ACCOUNT_DETAILS_GET,
		payload: {
			userID,
			authToken,
		},
	};
}

export function saveAccountDetails(accountDetails) {
	return {
		type: ACCOUNT_DETAILS,
		payload: accountDetails,
	};
}

export function updateAccount(userID, authToken, details) {
	return {
		type: ACCOUNT_DETAILS_UPDATE,
		payload: {
			authToken,
			userID,
			details,
		},
	};
}
