import { createActions, handleActions } from 'redux-actions';
import { AppState, DeviceData, User } from '~/modules/app/data/models';
import { Action } from 'redux-actions';
import { Dispatch } from 'redux';
import { getDeviceData } from '../services/fono';
import { appStateSelector } from '~/modules/app';

enum PersistKeys {
    USER = 'user',
    DEVICE_DATA = 'deviceData',
    BOOKINGS = 'bookings',
}

function persist<P>(key: PersistKeys, data: P): P {
    try {
        localStorage[key] = JSON.stringify(data);
        return data;
    } catch {
        return data;
    }
}

function restore<P, K>(key: PersistKeys, defaultValue: P): P | K {
    try {
        return JSON.parse(localStorage[key]);
    } catch {
        return defaultValue;
    }
}

interface RegisterPayload {
    username: string;
}

interface SetDeviceDataPayload {
    deviceData: DeviceData;
}

interface BookDevicePayload {
    device: string;
}

export interface AppActions {
    register: (username: string) => Action<RegisterPayload>;
    loadDeviceData: Function;
    setDeviceData: (deviceData: DeviceData) => Action<SetDeviceDataPayload>;
    bookDevice: (device: string) => Action<BookDevicePayload>;
    returnDevice: (device: string) => Action<BookDevicePayload>;
    logout: () => Action<void>;
}

export const appActions = (createActions({
    REGISTER: (username: string): RegisterPayload => ({ username }),
    SET_DEVICE_DATA: (deviceData: DeviceData) => ({ deviceData }),
    BOOK_DEVICE: (device: string) => ({ device }),
    RETURN_DEVICE: (device: string) => ({ device }),
    LOGOUT: () => ({}),
}) as unknown) as AppActions;
appActions.loadDeviceData = (): Function => (dispatch: Dispatch, getState): void => {
    const state: AppState = appStateSelector(getState());
    const stateHasData = Object.values(state.deviceData).length;
    const isDataComplete = stateHasData && state.devices.every(device => Boolean(state.deviceData[device]));

    if (!stateHasData || !isDataComplete) {
        getDeviceData(state.devices).then(deviceData => {
            dispatch(appActions.setDeviceData(deviceData));
        });
    }
};

type ReducerPayload = RegisterPayload | SetDeviceDataPayload | BookDevicePayload | void;

export const appReducer = handleActions<AppState, ReducerPayload>(
    {
        [appActions.register.toString()]: (state: AppState, action: Action<RegisterPayload>): AppState => ({
            ...state,
            user: persist<User>(PersistKeys.USER, {
                username: action.payload.username,
            }),
        }),
        [appActions.setDeviceData.toString()]: (state: AppState, action: Action<SetDeviceDataPayload>): AppState => ({
            ...state,
            deviceData: persist(PersistKeys.DEVICE_DATA, action.payload.deviceData),
        }),
        [appActions.bookDevice.toString()]: (state: AppState, action: Action<BookDevicePayload>): AppState => ({
            ...state,
            bookings: persist(PersistKeys.BOOKINGS, {
                ...state.bookings,
                [action.payload.device]: {
                    ...state.user,
                    bookingDate: new Date(),
                },
            }),
        }),
        [appActions.returnDevice.toString()]: (state: AppState, action: Action<BookDevicePayload>): AppState => ({
            ...state,
            bookings: persist(PersistKeys.BOOKINGS, {
                ...state.bookings,
                [action.payload.device]: null,
            }),
        }),
        [appActions.logout.toString()]: (state: AppState): AppState => ({
            ...state,
            user: persist(PersistKeys.USER, null),
        }),
    },
    new AppState(
        restore(PersistKeys.USER, null),
        restore(PersistKeys.DEVICE_DATA, {}),
        restore(PersistKeys.BOOKINGS, {}),
    ),
);
