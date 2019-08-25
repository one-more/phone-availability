import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { appReducers } from '~/modules/app';

export const store = createStore(
    combineReducers({
        ...appReducers,
    }),
    applyMiddleware(thunk),
);
