import {
    CONNECTION_STATUS,
    CONNECTION_SOCKET,
    NOTIFICATION_SET,
    NOTIFICATION_CLEAR,
} from './types';

import {
    ACCOUNT_LOGOUT,
} from 'libs/constants';

const defaultState = {
    connected: false,
    connectedEvent: false,
    socket: null,
    notes: null,
};

export default function(state = defaultState, action) {
    switch (action.type) {
        case CONNECTION_STATUS:
            return {
                ...state,
                ...action.payload,
            };
        case CONNECTION_SOCKET:
            return {
                ...state,
                socket: action.payload,
            };
        case NOTIFICATION_SET:
            return {
                ...state,
                notes: action.payload,
            };
        case NOTIFICATION_CLEAR:
            return {
                ...state,
                notes: null,
            };
        case ACCOUNT_LOGOUT:
    }

    return state;
}
