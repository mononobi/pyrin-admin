import React from 'react';
import { ConfirmDialog } from './confirm';


export function getConfirmDialogInfo(title, handleAccept, handleReject,
                                     component=null, importantAction=null, 
                                     description=null, acceptTitle=null, 
                                     rejectTitle=null, acceptColor=null, 
                                     rejectColor=null, rejectSx=null, 
                                     acceptSx=null) {

    return {
        component: component || ConfirmDialog,
        title: title,
        description: description,
        handleAccept: handleAccept,
        handleReject: handleReject,
        importantAction: importantAction,
        acceptTitle: acceptTitle,
        rejectTitle: rejectTitle,
        acceptColor: acceptColor,
        rejectColor: rejectColor,
        rejectSx: rejectSx,
        acceptSx: acceptSx
    };
}

export function getConfirmDialog(info) {

    return React.createElement(info.component, info);
}
