import * as React from 'react';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { SyntheticEvent } from 'react';
import Button from '@material-ui/core/Button';
import { appActions, appStateSelector } from '~/modules/app';
import { AppActions } from '../data/reducer';
import { RouteComponentProps, withRouter } from 'react-router';
import { Routes } from '~/data/routes';

const styles = {
    form: {
        margin: 'auto',
        display: 'flex',
        'align-items': 'stretch',
    },
    textField: {
        margin: 0,
    },
    button: {
        'margin-left': '10px',
    },
};

type WithClasses = {
    classes: {
        form: string;
        textField: string;
        button: string;
    };
};

export const LoginForm = withStyles(styles)(
    connect(
        appStateSelector,
        appActions,
    )(
        withRouter(
            class LoginFormComponent extends React.Component<WithClasses & AppActions & RouteComponentProps> {
                onSubmit = (event: SyntheticEvent): void => {
                    event.preventDefault();

                    const form = event.target as HTMLFormElement;
                    const username: string = form.username.value;
                    this.props.register(username);

                    this.props.history.push(Routes.index);
                };

                render(): JSX.Element {
                    const { classes } = this.props;

                    return (
                        <form className={classes.form} onSubmit={this.onSubmit}>
                            <TextField
                                variant="outlined"
                                required
                                placeholder="type username"
                                label="username"
                                margin="dense"
                                className={classes.textField}
                                name="username"
                            />
                            <Button variant="contained" color="primary" className={classes.button} type="submit">
                                Enter
                            </Button>
                        </form>
                    );
                }
            },
        ),
    ),
);
