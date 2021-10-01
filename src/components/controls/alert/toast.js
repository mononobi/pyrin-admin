import React from 'react';
import { Snackbar } from '@mui/material';
import { Slide } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { GENERIC_ERROR_MESSAGE } from './constants';


export const ToastNotification = (props) => {
    let message = props.alert.message;
    if (!message) {
        message = GENERIC_ERROR_MESSAGE;
    }

    return (
        <Snackbar open={Boolean(props.alert)} autoHideDuration={null} key={'alert-toast'}
                  TransitionComponent={Slide} sx={{width: '60%'}}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                  onClose={(event, reason) => {
                      props.closeHandler();
                  }}
                  TransitionProps={{
                      direction: 'up', in: true,
                      mountOnEnter: true, unmountOnExit: true}}>
            <Alert variant='filled' severity={props.alert.severity} sx={{width: '100%'}}>
                {message}
            </Alert>
        </Snackbar>
    )
};
