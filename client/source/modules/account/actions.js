import {
    USER_DETAILS,
    USER_DETAILS_GET,
    USER_DETAILS_UPDATE,
} from './types';

export function getUserDetails(userID, authToken) {
    return {
        type: USER_DETAILS_GET,
        payload: {
            userID,
            authToken,
        },
    };
}

export function saveUserDetails(userDetails) {
    return {
        type: USER_DETAILS,
        payload: userDetails,
    };
}

export function updateAccount(userID, authToken, details) {
    return {
        type: USER_DETAILS_UPDATE,
        payload: {
            authToken,
            userID,
            details,
        },
    };
}