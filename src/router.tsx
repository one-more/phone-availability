import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { LoginPage } from './pages/login';
import { IndexPage } from './pages/index';
import { Routes } from '~/data/routes';

export default function AppRouter(): JSX.Element {
    return (
        <Router>
            <div>
                <Route path={Routes.index} exact component={IndexPage} />
                <Route path={Routes.login} exact component={LoginPage} />
            </div>
        </Router>
    );
}
