import * as React from 'react';
import { withStyles } from '@material-ui/styles';

const styles = {
    root: {
        display: 'grid',
        'grid-template-rows': 'auto 1fr',
        height: '100vh',
    },
    header: {
        'grid-row': 1,
        display: 'grid',
    },
    content: {
        'grid-row': 2,
        display: 'grid',
    },
};

type WithClasses = {
    classes: {
        root: string;
        header: string;
        content: string;
    };
};

type ComponentProps = WithClasses & React.PropsWithChildren<React.ElementType>;

export const Layout = withStyles(styles)(function(props: ComponentProps) {
    const { classes } = props;
    return <div className={classes.root}>{props.children}</div>;
});

export const Header = withStyles(styles)(function(props: ComponentProps) {
    const { classes } = props;
    return <div className={classes.header}>{props.children}</div>;
});

export const Content = withStyles(styles)(function(props: ComponentProps) {
    const { classes } = props;
    return <div className={classes.content}>{props.children}</div>;
});
