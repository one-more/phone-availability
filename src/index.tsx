import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Router from './router';
import { Provider } from 'react-redux';
import { store } from '~/store';
import './index.css';

ReactDOM.render(
    <Provider store={store}>
        <Router />
    </Provider>,
    document.getElementById('root'),
);
