import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { DELETE_BUTTON_COLOR } from '../inputs/globals/constants';


const Transition = React.forwardRef(function Transition(props,
                                                        ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

export const ConfirmDialog = props => {

    return (
        <div>
            <Dialog open={true} TransitionComponent={Transition}>
                <DialogTitle>{props.title}</DialogTitle>
                {
                    props.description && (
                        <DialogContent>
                            <DialogContentText id='confirm-dialog-description'>
                                {props.description}
                            </DialogContentText>
                        </DialogContent>)
                }
                <DialogActions>
                    <Button onClick={props.handleReject} variant='text' size='large'
                            color={props.rejectColor || 'inherit'}
                            sx={props.rejectSx || {}} type='button'>
                        {props.rejectTitle}
                    </Button>
                    <Button onClick={props.handleAccept} variant='text' size='large'
                            color={props.acceptColor || 'primary'}
                            sx={props.acceptSx || {}} type='button'>
                        {props.acceptTitle}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export const ConfirmDeleteDialog = props => {

    return (
        <ConfirmDialog handleAccept={props.handleAccept}
                       handleReject={props.handleReject}
                       title={props.title}
                       description='This operation can not be undone.'
                       rejectTitle='Cancel' acceptColor='error'
                       acceptSx={{color: DELETE_BUTTON_COLOR}}
                       acceptTitle='Delete'/>
    );
};
