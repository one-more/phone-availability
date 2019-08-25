import * as React from 'react';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import { appActions, appStateSelector } from '~/modules/app';
import { AppState } from '~/modules/app/data/models';
import Button from '@material-ui/core/Button';
import { RouteComponentProps, withRouter } from 'react-router';
import { Routes } from '~/data/routes';
import { AppActions } from '~/modules/app/data/reducer';

const styles = {
    headerContainer: {
        display: 'flex',
        'justify-content': 'flex-end',
        padding: '10px',
        'border-bottom': '1px solid var(--border)',
    },
    userContainer: {
        display: 'flex',
        'align-items': 'center',
    },
};

type WithClasses = {
    classes: {
        headerContainer: string;
        userContainer: string;
    };
};

type Props = WithClasses & AppState & RouteComponentProps & AppActions;

export const HeaderComponent = withStyles(styles)(
    connect(
        appStateSelector,
        appActions,
    )(
        withRouter(
            class HeaderComponent extends React.Component<Props> {
                logOut = (): void => {
                    this.props.logout();
                    this.props.history.push(Routes.login);
                };

                render(): JSX.Element {
                    const { classes, user } = this.props;

                    return (
                        <div className={classes.headerContainer}>
                            <div className={classes.userContainer}>
                                <div>{user.username}</div>
                                <Button size="small" color="secondary" disableRipple onClick={this.logOut}>
                                    exit
                                </Button>
                            </div>
                        </div>
                    );
                }
            },
        ),
    ),
);
