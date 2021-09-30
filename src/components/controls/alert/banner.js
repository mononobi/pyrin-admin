import React from 'react';
import { Slide } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { GENERIC_ERROR_MESSAGE } from './constants';


export const BannerNotification = (props) => {
    let message = props.alert.message;
    if (!message) {
        message = GENERIC_ERROR_MESSAGE;
    }

    return (
        <Slide direction='down' in={Boolean(props.alert)} mountOnEnter unmountOnExit>
            <Alert variant='filled' severity={props.alert.severity}>
                <AlertTitle>{props.alert.title}</AlertTitle>
                {message}
            </Alert>
        </Slide>
    )
};
