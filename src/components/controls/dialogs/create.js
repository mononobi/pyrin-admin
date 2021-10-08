import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { DialogContent, DialogTitle } from '@mui/material';
import Slide from '@mui/material/Slide';
import { AddComponent } from '../../pages/add/add';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

export const CreateDialog = props => {

    return (
        <div>
            <Dialog
                fullScreen
                scroll={'paper'}
                onClose={props.closeFKCreateDialog}
                open={props.open}
                TransitionComponent={Transition}
            >
                <AppBar sx={{position: 'relative'}}>
                    <Toolbar>
                        <IconButton
                            edge='end'
                            color='inherit'
                            onClick={props.closeFKCreateDialog}
                        >
                            <CloseIcon/>
                        </IconButton>
                        <DialogTitle>{`Add ${props.name}`}</DialogTitle>
                    </Toolbar>
                </AppBar>
                <DialogContent dividers={true}>
                    <AddComponent forSelect={true}
                                  setSelectedFK={props.setSelectedFK}
                                  registerName={props.registerName}/>
                </DialogContent>
            </Dialog>
        </div>
    );
};
