import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { ListComponent } from '../../pages/list/list';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

export const SelectDialog = props => {

    return (
        <div>
            <Dialog
                fullScreen
                onClose={props.closeFKDialog}
                open={props.open}
                TransitionComponent={Transition}
            >
                <AppBar sx={{position: 'relative'}}>
                    <Toolbar>
                        <IconButton
                            edge='end'
                            color='inherit'
                            onClick={props.closeFKDialog}
                        >
                            <CloseIcon/>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <div style={{overflowY: 'scroll'}}>
                    <ListComponent forSelect={true}
                                   setSelectedFK={props.setSelectedFK}
                                   registerName={props.registerName}
                                   openFKCreateDialog={props.openFKCreateDialog}/>
                </div>
            </Dialog>
        </div>
    );
};
