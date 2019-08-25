import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { appStateSelector } from '~/modules/app';
import { AppState } from '~/modules/app/data/models';
import { Redirect } from 'react-router';
import { Routes } from '~/data/routes';

type Props = RouteComponentProps & AppState;

export const withLoginRedirect = (Wrapped: React.ElementType): React.ComponentClass => {
    return withRouter(
        connect(appStateSelector)(function(props: Props) {
            if (props.user) {
                return <Wrapped {...props} />;
            }
            return <Redirect to={Routes.login} />;
        }),
    );
};
