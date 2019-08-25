import * as React from 'react';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import { appActions, appStateSelector } from '~/modules/app';
import { AppState, Device } from '~/modules/app/data/models';
import { AppActions } from '~/modules/app/data/reducer';
import Chip from '@material-ui/core/Chip';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button } from '@material-ui/core';
import { withLeadingZeroes } from '~/utils';

const styles = {
    phoneContainer: {
        'padding-left': '20px',
    },
    phoneContent: {
        'border-bottom': '1px solid var(--border)',
        padding: '10px 0 20px',
    },
    deviceName: {
        display: 'flex',
        'align-items': 'center',
    },
    chip: {
        'margin-left': '10px',
    },
    expansionPanel: {
        'box-shadow': 'none',
        '&:before': {
            'background-color': 'transparent',
        },
    },
};

type WithClasses = {
    classes: {
        phoneContainer: string;
        phoneContent: string;
        deviceName: string;
        chip: string;
        expansionPanel: string;
    };
};

type Props = WithClasses & AppState & AppActions;

export const DeviceList = withStyles(styles)(
    connect(
        appStateSelector,
        appActions,
    )(
        class DeviceListComponent extends React.Component<Props> {
            componentDidMount(): void {
                this.props.loadDeviceData();
            }

            renderBookingDate(bookingDate: Date): string {
                const year = bookingDate.getFullYear();
                const month = bookingDate.getMonth();
                const date = bookingDate.getDate();
                const hours = bookingDate.getHours();
                const minutes = bookingDate.getMinutes();

                return `${year}/${month}/${date} ${withLeadingZeroes(hours)}:${withLeadingZeroes(minutes)}`;
            }

            renderDevice(name: string, data: Device): JSX.Element {
                const { classes, bookings, user } = this.props;
                const available = !bookings[name];
                const bookedByYou = !available && bookings[name].username == user.username;
                const bookedBy = bookedByYou ? 'you' : available ? '' : bookings[name].username;
                const bookingDate = available ? '' : this.renderBookingDate(new Date(bookings[name].bookingDate));
                const chipLabel = available ? 'available' : `booked by ${bookedBy} ${bookingDate}`;

                return (
                    <div key={name} className={classes.phoneContainer}>
                        <div className={classes.phoneContent}>
                            <div className={classes.deviceName}>
                                {name}
                                <Chip
                                    variant="outlined"
                                    className={classes.chip}
                                    size="small"
                                    label={chipLabel}
                                    style={{
                                        color: available ? 'var(--available)' : 'var(--booked)',
                                    }}
                                />
                            </div>
                            <ExpansionPanel className={classes.expansionPanel}>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <div>Details</div>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>Technology:</td>
                                                <td>{data.technology}</td>
                                            </tr>
                                            <tr>
                                                <td>2g bands:</td>
                                                <td>{data._2g_bands}</td>
                                            </tr>
                                            <tr>
                                                <td>3g bands:</td>
                                                <td>{data._3g_bands}</td>
                                            </tr>
                                            <tr>
                                                <td>4g bands:</td>
                                                <td>{data._4g_bands}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>

                            {available && (
                                <Button
                                    color="primary"
                                    size="small"
                                    variant="outlined"
                                    onClick={(): void => {
                                        this.props.bookDevice(name);
                                    }}
                                >
                                    Book device
                                </Button>
                            )}
                            {bookedByYou && (
                                <Button
                                    color="primary"
                                    size="small"
                                    variant="outlined"
                                    onClick={(): void => {
                                        this.props.returnDevice(name);
                                    }}
                                >
                                    Return device
                                </Button>
                            )}
                        </div>
                    </div>
                );
            }

            renderList(): JSX.Element[] {
                const list = [];
                const { deviceData } = this.props;
                for (const key in deviceData) {
                    if (deviceData.hasOwnProperty(key)) {
                        list.push(this.renderDevice(key, deviceData[key]));
                    }
                }
                return list;
            }

            render(): JSX.Element {
                return <div>{this.renderList()}</div>;
            }
        },
    ),
);
